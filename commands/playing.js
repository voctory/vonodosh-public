var fs = require('fs');

module.exports = {
	docstring : `Edits the bot's current game.\nRequirements: you must be a Vonodosh developer to use this command.`,
	usage : prefix => { return `Usage:\n\`${prefix}playing <game>\``},
    command: function(message) {
        if (!Object.keys(JSON.parse(fs.readFileSync('./info/masterlist.json', 'utf-8'))).includes(message.author.id)) { message.client.functions.message(message, "You do not have permission to edit my status!"); return }

        message.client.user.setGame(message.content.substr(message.content.split(" ")[0].length, message.content.length).trim())
        message.client.functions.message(message, `My game has been set to **${message.content.substr(message.content.split(" ")[0].length, message.content.length).trim()}**.`)
    }
}
