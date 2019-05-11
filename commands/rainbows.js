/*	  rainbows.js
 *  Fun module for making rainbows with embeds
 */
var fs = require('fs');
module.exports = {
	docstring: `Nokko's fun command. Spams colorful? embeds.`,
    usage: prefix => { return `Usage:\n\`${prefix}nokko <rainbownumber>\` You can't go above 5 if you aren't a developer, so joke's on you.`},
	command: message => {
		let num = message.content.split(" ")[1];
		if (num < 6 || Object.keys(JSON.parse(fs.readFileSync("./info/masterlist.json", "utf-8"))).includes(message.author))
			for (var c = 0; c < parseInt(message.content.split(" ")[1], 10); c++){
				message.client.functions.message(message, { color: message.client.functions.embed("color")})
			}
	}
}
