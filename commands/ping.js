module.exports = {
    docstring: `Ping command. Displays the bot's latency to the discord servers, based on its constant pings. Trust me, it's accurate.`,
    usage: prefix => { return `Usage:\n\`${prefix}ping\``},
    command: message => {
        message.client.functions.message(message, {
          description: `My client's ping is currently **${message.client.pings[0]}ms**.`,
          color: message.client.functions.embed("color"),
          footer: message.client.functions.embed("footer", message)
        })
    }
}
