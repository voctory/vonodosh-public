var items = ["rock", "paper", "scissors"];

function thing(item) {
		if (item == "rock") return ":new_moon:"
		else if (item == "scissors") return ":scissors:"
		else if (item == "paper") return ":page_facing_up:"
}

module.exports = {
    docstring: `Play rock-paper-scissors with the bot.`,
    usage: prefix => {return `Usage\n\`${prefix}rps <rock, paper, or scissors>\``},
    command: function(message) {
        if (items.indexOf(message.content.split(" ")[1]) == -1) { message.client.functions.message(message, `What you wrote was not an option! You can write **rock, paper,** or **scissors**.`); return; }

				var selected = "";
				var userSelected = message.content.split(" ")[1]

				selected = items[Math.floor(Math.random() * 3)];

        if (selected == items[0] && userSelected == items[2] || selected == items[2] && userSelected == items[1] || selected == items[1] && userSelected == items[0]) {
          message.client.functions.message(message, {
            description: `You chose **${userSelected}** ${thing(userSelected)}, and I chose **${selected}** ${thing(selected)}. I win! :wink:`,
            color: message.client.functions.embed("color"),
            footer: message.client.functions.embed("footer", message)
          })
        }
        else if (selected == items[2] && userSelected == items[0] || selected == items[1] && userSelected == items[2] || selected == items[0] && userSelected == items[1]) {
          message.client.functions.message(message, {
            description: `You chose **${userSelected}** ${thing(userSelected)}, and I chose **${selected}** ${thing(selected)}. You win! :sweat_smile:`,
            color: message.client.functions.embed("color"),
            footer: message.client.functions.embed("footer", message)
          })
        }
        else if (selected == userSelected) {
          message.client.functions.message(message, {
            description: `You chose **${userSelected}** ${thing(userSelected)}, and I chose **${selected}** ${thing(selected)}. It's a tie! :smile:`,
            color: message.client.functions.embed("color"),
            footer: message.client.functions.embed("footer", message)
          })
        }
    }
}
