// small increment, big increment, initial reset
var values = [50000, 100000, 5000000]

var fs = require('fs');
var slotsarray = [":tangerine:", ":popcorn:", ":football:", ":pizza:", ":maple_leaf:", ":eggplant:", ":peach:"];
var currentJackpot = values[2]

function checkIfWin(author, callback) {
    var chosen = [slotsarray[Math.floor(Math.random() * slotsarray.length)], slotsarray[Math.floor(Math.random() * slotsarray.length)], slotsarray[Math.floor(Math.random() * slotsarray.length)]]
    if (chosen[0] == chosen[1] && chosen[1] == chosen[2])
      setTimeout(function() {
        winner(author, currentJackpot);
        callback(`${chosen[0]} | ${chosen[1]} | ${chosen[2]}\n***:moneybag: YOU WON THE JACKPOT! :moneybag:***\n**\`$${currentJackpot}\` has been added to your Slots Winnings!\nJackpot has been reset to **\`$${values[2]}\``);
        currentJackpot = values[2]
      }, 2000)
    else if (chosen[0] == chosen[1] || chosen[0] == chosen[2] || chosen[1] == chosen[2])
      setTimeout(function() {
        currentJackpot += values[0];
        callback(`${chosen[0]} | ${chosen[1]} | ${chosen[2]}\n:open_mouth: There was a match between 2 of the 3 emotes! Try again? :open_mouth:\n**Jackpot has been brought up to **\`$${currentJackpot}\``)
      }, 2000)
    else
      setTimeout(function() {
        currentJackpot += values[1];
        callback(`${chosen[0]} | ${chosen[1]} | ${chosen[2]}\n:anguished: There were no matches! Try again? :thinking:\n**Jackpot has been brought up to **\`$${currentJackpot}\``)
      }, 2000)
}

function winner(author, won) {
    var list = JSON.parse(fs.readFileSync('./leaderboards/slots.json'))
    if (list[author.id] == undefined) list[author.id] = { wins: 0, money: 0, username: author.username + "#" + author.discriminator};
    if (list[author.id].username != author.username + "#" + author.discriminator) list[author.id].username = author.username + "#" + author.discriminator ;
    list[author.id].wins++
    list[author.id].money += won
    fs.writeFileSync('./leaderboards/slots.json', JSON.stringify(list), 'utf-8');
}

module.exports = {
    docstring: `Spin the slot machine!\nRequirements: You must be ready for a jolly good time in order to use this command!`,
    usage: prefix => {return `Usage\n\`${prefix}slots\``},
    command: message => {
        message.client.functions.message(message,
          {
            title: "Slots Command:",
            description: `***:slot_machine: SPINNING THE SLOT MACHINE :slot_machine:***\n**Current Jackpot is at \`$${currentJackpot}\`**`,
            color: message.client.functions.embed("color"),
            footer: message.client.functions.embed("footer", message)
          }, function(msg) {
            checkIfWin(message.author, function(results) {
              msg.edit("", {
                embed: {
                  title: "Slots Command:",
                  description: `${message.author} - ${results}`,
                  color: message.client.functions.embed("color"),
                  footer: message.client.functions.embed("footer", message)
                }
              })
            })
        })
    },
	nonembed: (message) => {
		message.client.functions.message(message, "Some embeds are just too damn complicated.")
	}
}
