module.exports = {
    docstring: `Displays some stats and info for a specified user.`,
    usage: prefix => {return `Usage\n\`${prefix}userinfo @nokko#9009\``},
    command: message => {
      var oneDay = 24*60*60*1000

        var words = message.content.split(' ');
	    var textChannels = 0;
	    var voiceChannels = 0;
        if(words.length == 1)
		{
			if(!message.guild.members.get(message.author.id).voiceChannel)
				var voiceChannel = "User is not in a voice channel";
			else
				var voiceChannel = message.guild.members.get(message.author.id).voiceChannel.name;
			if(message.guild.members.get(message.author.id).nickname == null)
				var nickname = "";
			else
				var nickname = "\nNickname: " + message.guild.members.get(message.author.id).nickname;
			var lastMessageDate = "Could not retrieve message";
			var lastMessageChannel = "";
			for(var i = 0; i < Array.from(message.guild.channels).length; i++)
			{
				if(Array.from(message.guild.channels)[i][1].type == "text" && Array.from(message.guild.channels)[i][1].messages.has(message.guild.members.get(message.author.id).lastMessageID))
				{
					lastMessageDate = Array.from(message.guild.channels)[i][1].messages.get(message.guild.members.get(message.author.id).lastMessageID).createdAt.toUTCString();
					lastMessageChannel = " from **#" + Array.from(message.guild.channels)[i][1].messages.get(message.guild.members.get(message.author.id).lastMessageID).channel.name + "**";
				}
			}
			var game = "";
			if(message.author.presence.game == null)
				game = "none";
			else
				game = message.author.presence.game.name;
			message.client.functions.message(message, {
				title: "Userinfo for " + message.author.username + "#" + message.author.discriminator,
				description: "User ID: " + message.author.id + nickname,
				thumbnail: {
					url: message.author.avatarURL
				},
				color: message.client.functions.embed("color"),
        footer: message.client.functions.embed("footer", message),
				fields: [
					{
						name: "Presence",
						value: "Status: " + message.guild.members.get(message.author.id).presence.status + "\nGame: " + game,
						inline: true
					},
					{
						name: "Last Message Seen at",
						value: lastMessageDate + lastMessageChannel,
						inline: true
					},
					{
						name: "Voice Channel",
						value: voiceChannel,
						inline: true
					},
					{
						name: "Highest Role",
						value: message.guild.members.get(message.author.id).highestRole.name,
						inline: true
					},
					{
						name: "Account Created at",
						value: `${message.author.createdAt} (${Math.round(Math.abs((message.author.createdAt.getTime() - new Date().getTime())/(oneDay)))} days ago)`,
						inline: true
					},
					{
						name: "Joined " + message.guild.name + " at",
						value: `${message.guild.member(message.author).joinedAt} (${Math.round(Math.abs((message.guild.member(message.author).joinedAt.getTime() - new Date().getTime())/(oneDay)))} days ago)`,
						inline: false
					}
				]
			});
		}
		else if(Array.from(message.mentions.users).length == 1)
		{
			var user = Array.from(message.mentions.users)[0][1];
			if(!message.guild.members.get(user.id).voiceChannel)
				var voiceChannel = "User is not in a voie channel";
			else
				var voiceChannel = message.guild.members.get(user.id).voiceChannel.name;
			if(message.guild.members.get(user.id).nickname == null)
				var nickname = "";
			else
				var nickname = "\nNickname: " + message.guild.members.get(user.id).nickname;
			var lastMessageDate = "Could not retrieve message";
			var lastMessageChannel = "";
			for(var i = 0; i < Array.from(message.guild.channels).length; i++)
			{
				if(Array.from(message.guild.channels)[i][1].type == "text" && Array.from(message.guild.channels)[i][1].messages.has(message.guild.members.get(user.id).lastMessageID))
				{
					lastMessageDate = Array.from(message.guild.channels)[i][1].messages.get(message.guild.members.get(user.id).lastMessageID).createdAt.toUTCString();
					lastMessageChannel = " from **#" + Array.from(message.guild.channels)[i][1].messages.get(message.guild.members.get(user.id).lastMessageID).channel.name + "**";
				}
			}
			var game = "";
			if(user.presence.game == null)
				game = "none";
			else
				game = user.presence.game.name;
			message.client.functions.message(message, {
				color: Math.floor(Math.random() * 16777440) + 1,
				title: "Userinfo for " + user.username + "#" + user.discriminator,
				description: "User ID: " + user.id + nickname,
				thumbnail: {
					url: user.avatarURL
				},
				footer:{
					icon_url: message.client.user.avatarURL,
					text: "Oauth/Invite: bit.ly/vonodoshoauth | List of Commands: bit.ly/vonodosh"
				},
				fields: [
					{
						name: "Presence",
						value: "Status: " + user.presence.status + "\nGame: " + game,
						inline: true
					},
					{
						name: "Last Message Seen at",
						value: lastMessageDate + lastMessageChannel,
						inline: true
					},
					{
						name: "Highest Role",
						value: message.guild.members.get(user.id).highestRole.name,
						inline: true
					},
					{
						name: "Account Created at",
						value: `${user.createdAt} (${Math.round(Math.abs((user.createdAt.getTime() - new Date().getTime())/(oneDay)))} days ago)`,
						inline: true
					},
					{
						name: "Joined " + message.guild.name + " at",
						value: `${message.guild.member(user).joinedAt} (${Math.round(Math.abs((message.guild.member(user).joinedAt.getTime() - new Date().getTime())/(oneDay)))} days ago)`,
						inline: false
					}
				]
			});
		}
		else
			message.client.functions.message(message, "Please mention exactly one user");
    },
	nonembed: (message) => {
//		Placeholder message until we get a proper unembedified version.
		message.client.functions.message(message, "Some embeds are just too damn complicated.")
	}
}
