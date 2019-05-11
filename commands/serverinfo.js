module.exports = {
    docstring: `Displays info about a server.`,
    usage: prefix => {return `Usage\n\`${prefix}serverinfo\``},
	command: message => {
    var oneDay = 24*60*60*1000
    var currentDate = new Date()
    var diffDays = Math.round(Math.abs((message.guild.createdAt.getTime() - currentDate.getTime())/(oneDay)));

		var words = message.content.split(' ');
		var textChannels = 0;
		var voiceChannels = 0;
		for(var i = 0; i < Array.from(message.guild.channels).length; i++)
		{
			if(Array.from(message.guild.channels)[i][1].type == "voice")
				voiceChannels++;
			if(Array.from(message.guild.channels)[i][1].type == "text")
				textChannels++;
		}
		message.client.functions.message(message, {
			color: message.client.functions.embed("color"),
			footer: message.client.functions.embed("footer", message),
			title: "Server info for " + message.guild.name,
			description: "Server ID: " + message.guild.id,
			thumbnail: {
				url: message.guild.iconURL
			},
			fields: [
				{
					name: "Member Count",
					value: message.guild.memberCount,
					inline: true
				},
				{
					name: "Owner",
					value: message.guild.owner.user.username + "#" + message.guild.owner.user.discriminator,
					inline: true
				},
				{
					name: "Server Region",
					value: message.guild.region,
					inline: true
				},
				{
					name: "Roles",
					value: Array.from(message.guild.roles).length,
					inline: true
				},
				{
					name: "Channels",
					value: "Text: " + textChannels + "\nVoice: " + voiceChannels,
					inline: true
				},
				{
					name: "Server Created At",
					value: `${message.guild.createdAt.toUTCString()} (${diffDays} days ago)`,
					inline: false
				}
			]
		});
	},
	noembed: message => {
//		Placeholder message until we get a proper unembedified version.
		message.client.functions.message(message, "Some embeds are just too damn complicated.")
	}
}
