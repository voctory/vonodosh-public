module.exports = {
    docstring: `Role command, lists every user who holds the specified role.`,
    usage: prefix => {`Usage\n\`${prefix}role <role>\``},
	command: message => {
		var list = "";
		var role = "";
		var arrayOfPeople;
    var roleObject;
		var roleFound = false;
		var words = message.content.split(' ');
		for(var i = 1; i < words.length; i++)
			role += words[i] + " ";
		role = role.substring(0,role.length - 1)
		for(var a = 0; a < Array.from(message.guild.roles).length; a++)
		{
			if(role.toLowerCase() == (Array.from(message.guild.roles)[a][1].name.toLowerCase()))
			{
				roleFound = true;
        roleObject = Array.from(message.guild.roles)[a][1]
				arrayOfPeople = Array.from(Array.from(message.guild.roles)[a][1].members)
			}
		}
		if(roleFound == true)
		{
			if(arrayOfPeople.length > 0)
			{
				var count = arrayOfPeople.length;
				for(var e = 0; e < arrayOfPeople.length; e++)
				list += arrayOfPeople[e][1].user.username + "\n";
				message.client.functions.message(message, {
          title: `Users with the role: ${roleObject.name} (${count} users)`,
          description: list,
          color: message.client.functions.embed("color"),
          footer: message.client.functions.embed("footer", message)
        })
			}
			else
				message.client.functions.message(message, "The role was found however no users have that role.")
		}
		else
			message.client.functions.message(message, "I couldn't find that role.")
	}
}
