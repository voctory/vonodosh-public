var BitlyAPI = require("node-bitlyapi");
var Bitly = new BitlyAPI;
var fs = require('fs');

Bitly.setAccessToken(JSON.parse(fs.readFileSync('./info/keys.json', 'utf-8')).bitly)

module.exports = {
	docstring: `Links you to avatars of the people you mention.`,
	usage: prefix => { return `Usage:\n\`${prefix}avatar @Example#1234\` or \`avatar\` to get your own avatar.` },
  
  command: message => {
		if(Array.from(message.mentions.users).length == 0)
			shortenURL(message.author.avatarURL, function(url) {
				message.client.functions.message(message, {
					description: `${message.author}, here is your avatar:\n\n`,
					thumbnail: {
						url: message.author.avatarURL
					},
					color: message.client.functions.embed("color"),
					footer: message.client.functions.embed("footer", message),
					fields: [
						{ name: "Avatar URL:", value: url}
					]
				})
			})
		else
			shortenURL(Array.from(message.mentions.users)[0][1].avatarURL, function(url) {
				message.client.functions.message(message, {
					description: `${message.author}, ${Array.from(message.mentions.users)[0][1].username}'s avatar is:\n\n`,
					thumbnail: {
						url: Array.from(message.mentions.users)[0][1].avatarURL
					},
					color: message.client.functions.embed("color"),
					footer: message.client.functions.embed("footer", message),
					fields: [
						{ name: "Avatar URL:", value: url}
					]
				})
			})
	},
  nonembed: message => {
		var words = message.content.split(" ")
		if(words.length == 1)
			message.client.functions.message(message, `**${message.author}, here is your avatar:**\n\n${message.author.avatarURL}`)
		if(Array.from(message.mentions.users).length == 1)
			message.client.functions.message(message, `**${message.author}, ${Array.from(message.mentions.users)[0][1].username}'s avatar is:**\n\n${Array.from(message.mentions.users)[0][1].avatarURL}`)
  }
}

function shortenURL(url, callback) {
	Bitly.shortenLink(url, function(err, results) {
		if (err) callback(url);
		else callback(JSON.parse(results).data.url)
	})
}
