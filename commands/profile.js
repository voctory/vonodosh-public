var fs = require('fs')

module.exports = {
	docstring: `Shows you game stats for a specific user.`,
	usage: prefix => {`Usage:\n\`${prefix}profile <@Example#1234>\` or \`${prefix}profile\` which is shorter than mentioning yourself.`},
	command: message => {
		if (Array.from(message.mentions.users).length > 0) grabProfile(message, Array.from(message.mentions.users)[0][1])
		else grabProfile(message, message.author)
	}
}

function grabProfile(message, user) {
	var data = [{name: "Slots:", value: slotsData(user.id), inline: true}];
	var messageFields = [];

	// basically pushing everything that's inside :data: into messageFields
	for (var i in data) {
		messageFields.push(data[i]);
	}

    message.client.functions.message(message, {
      title: `Vonodosh Profile for ${user.username}#${user.discriminator}`,
      description: "Displaying Vonodosh game statistics and all that good stuff",
      thumbnail: {url: message.client.user.avatarURL},
      fields: messageFields,
      color: message.client.functions.embed("color"),
      footer: message.client.functions.embed("footer", message)
    })
}

function slotsData(id) {
	if (!Object.keys(JSON.parse(fs.readFileSync('./leaderboards/slots.json', 'utf-8'))).includes(id)) return "Data Not Found";
	else {
		var parsedObject = JSON.parse(fs.readFileSync('./leaderboards/slots.json', 'utf-8'))
		return `Money - **\`$${parsedObject[id].money}\`**\nWins - **\`${parsedObject[id].wins}\`**`
	}
}
