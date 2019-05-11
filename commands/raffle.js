module.exports = {
    docstring: `Raffle command. Picks a random user (online and offline) from the server. If a role is specified, selects users from that role. Useful for giveaways and raffles.`,
    usage: prefix => { return `Usage:\n\`${prefix}raffle <optionalrole>\` Roles are not case-sensitive.`},
    command: message => {
        var words = message.content.split(" ")
        var role = "";
		var roleFound = false;
		if(words.length == 1)
			message.client.functions.message(message, {description:"Raffled user: **" + message.guild.members.random().user.username + "**", color: message.client.functions.embed("color")})
		else
		{
			for(var i = 1; i < words.length; i++)
				role += words[i] + " ";
			role = role.substring(0,role.length - 1)
			for(var a = 0; a < Array.from(message.guild.roles).length; a++)
			{
				if(role.toLowerCase() == Array.from(message.guild.roles)[a][1].name.toLowerCase())
				{
					roleFound = true;
					var roleToRaffle = Array.from(message.guild.roles)[a][1]
				}
			}
			if(roleFound)
				if(Array.from(message.guild.roles.find('name',roleToRaffle.name).members).length == 0)
					message.client.functions.message(message, {description:"No users have that role", color: message.client.functions.embed("color")})
				else
				message.client.functions.message(message, {description:"Raffled user from " + roleToRaffle.name + " role: **" + roleToRaffle.members.random().user.username + "**", color: message.client.functions.embed("color")})
			else
				message.client.functions.message(message, {description:"Role not found", color: message.client.functions.embed("color")})
		}
    },
	nonembed: message => {
        var words = message.content.split(" ")
        var role = "";
		var roleFound = false;
		if(words.length == 1)
			message.client.functions.message(message, "Raffled user: **" + message.guild.members.random().user.username + "**")
		else
		{
			for(var i = 1; i < words.length; i++)
				role += words[i] + " ";
			role = role.substring(0,role.length - 1)
			for(var a = 0; a < Array.from(message.guild.roles).length; a++)
			{
				if(role.toLowerCase() == Array.from(message.guild.roles)[a][1].name.toLowerCase())
				{
					roleFound = true;
					var roleToRaffle = Array.from(message.guild.roles)[a][1]
				}
			}
			if(roleFound)
				if(Array.from(message.guild.roles.find('name',roleToRaffle.name).members).length == 0)
					message.client.functions.message(message, "No users have that role")
				else
				message.client.functions.message(message, "Raffled user from " + roleToRaffle.name + " role: **" + roleToRaffle.members.random().user.username + "**")
			else
				message.client.functions.message(message, "Role not found")
		}
    },
}
