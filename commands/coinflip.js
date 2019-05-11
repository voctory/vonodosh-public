module.exports =  {
	docstring: `Flips a coin, for great profit!`,
	usage: prefix => { return `Usage:\n\`${prefix}coinflip\``},
    command: function(message) {
        var options = ["heads", "tails"];
        message.client.functions.message(message, {
          description: `You flipped a coin... and it landed on **${options[Math.floor(Math.random() * 2)]}!**`,
          color: message.client.functions.embed("color"),
          footer: message.client.functions.embed("footer", message)
        })
    }
}
