module.exports = {
	docstring: `Channel move command. Helpful if you are faster with they keyboard than you are the mouse.\nRequirements: You must have the permission to move members on this guild.`,
	usage: prefix => { return `Usage:\n\`${prefix}move <user> <optionaluser> to <channel>, e.g. "${prefix}move @Example#1234 to AFK Channel"\``},
    command: message => {
      var words = message.content.split(' ');
	    var channel = "";
	    var channelFound = false
			var movePermissions = false;
      if(Array.from(message.mentions.users).length == 0)
				message.client.functions.message(message, module.exports.usage)
				else {
					if(message.content.indexOf("to") > 0 && message.content.indexOf("|") == -1) channel = message.content.substring(message.content.indexOf("to") + 3,message.content.length)
					else if(message.content.indexOf("|") > 0 && message.content.indexOf("to") == -1) channel = message.content.substring(message.content.indexOf("|") + 2, message.content.length)
					if(message.guild.members.get(message.author.id).hasPermission("MOVE_MEMBERS") && message.author.bot == false) {
						var usersToMove = Array.from(message.mentions.users)
						for(var a = 0; a < Array.from(message.guild.channels).length; a++) {
							if(channel.toLowerCase() == Array.from(message.guild.channels)[a][1].name.toLowerCase() && Array.from(message.guild.channels)[a][1].type == "voice") {
								var channelObject = Array.from(message.guild.channels)[a][1]
								channelFound = true;
								if (channelObject.permissionsFor(message.guild.member(message.author)).hasPermission("CONNECT")) movePermissions = true;
							}
						}
						if(usersToMove.length == 1) {
							if (movePermissions == false) { message.client.functions.message(message, `You need to have permission to connect to the channel you're trying to move to.`); return }
							if(channelFound) {
								message.client.functions.message(message, "Found it! Attempting to move " + usersToMove[0][1] + " to `" + message.guild.channels.find('name',channelObject.name).name + "`.")
								message.guild.members.get(usersToMove[0][1].id).setVoiceChannel(message.guild.channels.find('name',channelObject.name))
							}
							else message.client.functions.message(message, "I couldn't find that voice channel, please make sure to type it the way it is (punctuation, special characters, etc).")
						}
						else if(usersToMove.length > 1){
							if (movePermissions == false) { message.client.functions.message(message, `You need to have permission to connect to the channel you're trying to move to.`); return }
							if(channelFound) {
								message.client.functions.message(message, "Found it! Attempting to move the following users to `" + message.guild.channels.find('name',channelObject.name).name + "`.")
								for(var a = 0; a < usersToMove.length; a++) message.guild.members.get(usersToMove[a][1].id).setVoiceChannel(message.guild.channels.find('name',channelObject.name))
							}
							else message.client.functions.message(message, "I couldn't find that voice channel, please make sure to type it the way it is (punctuation, special characters, etc).")
						}
				}
				else if(channel.length > 0) message.client.functions.message(message, "You don't have permission to move members in this server.")
				else message.client.functions.message(message, module.exports.usage)
			}
		}
}
