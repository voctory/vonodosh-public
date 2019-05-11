var fs = require('fs');

module.exports = {
    docstring: `Toggles the server-wide embed setting on or off.`,
    usage: prefix => {return `Usage\n\`fix this later\``},
  command: message => {
    if (message.channel.type == "dm") { message.client.functions.message(message, "You can't toggle embeds in DMs!"); return }

    var file = JSON.parse(fs.readFileSync('./info/toggleEmbeds.json', 'utf-8'))
    if (file.indexOf(message.guild.id) == -1) {
      file.push(message.guild.id)
      message.client.functions.message(message, "added")
      fs.writeFileSync('./info/toggleEmbeds.json', JSON.stringify(file), 'utf-8')
    }
    else if (file.indexOf(message.guild.id > -1)) {
      file.splice(file.indexOf(message.guild.id), 1)
      message.client.functions.message(message, "removed")
      fs.writeFileSync('./info/toggleEmbeds.json', JSON.stringify(file), 'utf-8')
    }
  },
	nonembed: (message) => {
//    No embeds were used here, copying the original function because it'll get embedified?.
		if (message.channel.type == "dm") { message.client.functions.message(message, "You can't toggle embeds in DMs!"); return }

    var file = JSON.parse(fs.readFileSync('./info/toggleEmbeds.json', 'utf-8'))
    if (file.indexOf(message.guild.id) == -1) {
      file.push(message.guild.id)
      message.channel.sendMessage("added")
      fs.writeFileSync('./info/toggleEmbeds.json', JSON.stringify(file), 'utf-8')
    }
    else if (file.indexOf(message.guild.id > -1)) {
      file.splice(file.indexOf(message.guild.id), 1)
      message.channel.sendMessage("removed")
      fs.writeFileSync('./info/toggleEmbeds.json', JSON.stringify(file), 'utf-8')
    }
	}
}
