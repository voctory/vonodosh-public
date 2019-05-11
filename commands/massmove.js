module.exports = {
    docstring: `Mass move command. Moves all members in one channel to another channel.`,
    usage: prefix => {`Usage:\n\`${prefix}massmove <channel1> to <channel2>\nExample: \`${prefix}massmove music channel to general\``},
    command: message => {
        if (message.content.split(" ").length == 1) {message.client.functions.message(message, "```Usage: +massmove channel1 to channel2\nExample: +massmove music channel to general```"); return}

        var channel1 = message.content.substring(10,message.content.indexOf("to") - 1);
        var channel2 = message.content.substring(message.content.indexOf("to") + 3, message.content.length);
    		var channel1Found = false;
    		var channel2Found = false;
        var channel1Perms = false;
        var channel2Perms = false;
    		if(message.guild.members.get(message.author.id).hasPermission("MOVE_MEMBERS") && message.author.bot == false)
    		{
    			if(channel1.length == 0 || channel2.length == 0)
    				message.client.functions.message(message, "```Usage: +massmove channel1 to channel2\nExample: +massmove music channel to general```")
    			for(var a = 0; a < Array.from(message.guild.channels).length; a++) {
    				if(channel1.toLowerCase() == Array.from(message.guild.channels)[a][1].name.toLowerCase() && Array.from(message.guild.channels)[a][1].type == "voice"){
    					channel1Found = true;
    					var channel1Object = Array.from(message.guild.channels)[a][1]
              if (channel1Object.permissionsFor(message.guild.member(message.author)).hasPermission("CONNECT")) channel1Perms = true;
    				}
    				if(channel2.toLowerCase() == Array.from(message.guild.channels)[a][1].name.toLowerCase() && Array.from(message.guild.channels)[a][1].type == "voice"){
    					channel2Found = true;
    					var channel2Object = Array.from(message.guild.channels)[a][1];
              if (channel2Object.permissionsFor(message.guild.member(message.author)).hasPermission("CONNECT")) channel2Perms = true;
    				}
    			}
    			if(channel1Found == true && channel2Found == true){
            if (channel2Perms == false && channel1Perms == false) {
              message.client.functions.message(message, `You need to have permission to connect to both of the channels you've mentioned.`);
              return
            }
    				var usersToMove = Array.from(message.guild.channels.find('name',channel1Object.name).members);
    				message.client.functions.message(message, "Attempting to move the users from `" + channel1Object.name + "` to `" + channel2Object.name + "`.")
    				for(var i = 0; i < usersToMove.length; i++) usersToMove[i][1].setVoiceChannel(message.guild.channels.find('name',channel2Object.name))
    			}
    			else
    				message.client.functions.message(message, "Either one or both of the channels were not found, please make sure to type it the way it is (punctuation, special characters, etc).")
    		}
    		else if(message.guild.members.get(message.author.id).hasPermission("MOVE_MEMBERS") == false) message.client.functions.message(message, "You don't have permission to move members on this server.")
    		else message.client.functions.message(message, "```Usage: +massmove channel1 to channel2\nExample: +massmove music channel to general```")
    }
}
