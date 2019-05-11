var fs = require('fs')

module.exports = {
    docstring: `Restarts the bot. All restarts are logged, and visible to the developers.\nRequirements: You must be a Vonodosh Developer to use this command.`,
    usage: prefix => {return `Usage\n\`${prefix}restart\``},
    command: message => {
        if (!Object.keys(JSON.parse(fs.readFileSync('./info/masterlist.json', 'utf-8'))).includes(message.author.id)) { message.channel.sendMessage("You do not have permission to restart me!"); return }

        message.client.functions.message(message, {
          description: "**Restarting the bot!**",
          color: message.client.functions.embed("color"),
          footer: message.client.functions.embed("footer", message)
        })
        console.log(`Bot restarted by ${message.author.username}`);
        setTimeout(function() { process.exit() }, 500)
    }
}
