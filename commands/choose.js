module.exports = {
	docstring: `Chooses between the options provided, based on ~~a roll of the dice~~ intrinsic betterness.`,
	usage: prefix => { return `Usage:\n\`${prefix}choose <1> | <2>\` or \`${prefix}choose <1>  <2>  <3> (there shouldn't be spaces in <1>)\` or use \`better\` instead of \`choose\``},
    command: function(message) {
        if (message.content.split("|").length <= 2 && message.content.split(" ").length <= 2 && message.content.split("or").length) {
					message.client.functions.message(message, {
						description: `You didn't use the command correctly!\n\n\`Syntax: ${message.content.substr(0, 1)}choose (item1) | (item2) | (item3) ...\``,
						color: message.client.functions.embed("color"),
						footer: message.client.functions.embed("footer", message)
					});
					return;
				}

				// choosing the seperators
				let seperator = " "
				if (message.content.indexOf("|") != -1) seperator = "|"
				if (message.content.indexOf("or") != -1) seperator = "or"

        var options = message.content.substr(message.content.split(seperator)[0].length, message.content.length).trim().split(seperator);
        message.client.functions.message(message, {
          description: `Out of the **${options.length}** possible options you gave me, I've decided to choose **${options[Math.floor(Math.random() * options.length)].trim()}**!`,
          color: message.client.functions.embed("color"),
          footer: message.client.functions.embed("footer", message)
        })
    }
}
