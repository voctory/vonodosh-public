module.exports = {
	docstring: `Finds users in your guild playing a specified game. (based on what you/they tell Discord, not like voodoo)`,
	usage: prefix => { return `Usage:\n\`${prefix}findgame <game>\` OR just \`${prefix}\`findgame if you want to search users playing the same game as you` },
    command: message => {
			var game = message.content.substr(message.content.split(" ")[0].length, message.content.length).trim();
			// rewrote yelldosh's method of obtaining the game from the message, was unnecessarily tedious
			if (game == "" && message.author.presence.game != null) game = message.author.presence.game.name;
			else { message.client.functions.message(message, `${module.exports.docstring}\n\n${module.exports.usage(message.client.functions.prefixManager(message))}`); return }

			var usersPlaying = "";
			var count = 0;
			var gameName = "";
			var members = Array.from(message.guild.members);
			for(var a = 0; a < members.length; a++)
			{
				if(members[a][1].presence.game != null)
				{
					if(members[a][1].presence.game.name != null)
					{
						if(members[a][1].presence.game.name.toLowerCase() == game.toLowerCase())
						{
							usersPlaying += members[a][1].user.username + "\n";
							count++;
							gameName = members[a][1].presence.game.name;
						}
					}
				}
			}
			if(count == 0)
				message.client.functions.message(message, "I couldn't find any users playing that game")
			else
				message.client.functions.message(message, {
					title: "Users playing the game: " + gameName + " (" + count + " users)",
					color: message.client.functions.embed("color"),
	        footer: message.client.functions.embed("footer", message),
					description: usersPlaying
				});
	}
}
