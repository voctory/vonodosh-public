var fs = require('fs');
var functionObject = { slots: slotsLeaderboard },
    functionKeys = Object.keys(functionObject)

module.exports = {
    docstring: `Leaderboard lookup command.`,
    usage: prefix => { return `Usage:\n\`${prefix}leaderboard <leaderboard>\` The only valid leaderboard right now is "slots". Other leaderboards are coming soon.`},
    command: message => {
        if (message.content.split(" ").length == 1) {
          message.client.functions.message(message, {
            description: `I didn't receive a leaderboard to bring up!\n\n\`Syntax: ${message.client.functions.prefixManager(message)}leaderboard (slots)\`\nOther leaderboards are coming soon.`,
            color: message.client.functions.embed("color"),
            footer: message.client.functions.embed("footer", message)
          });
          return;
        }
        else if (functionKeys.includes(message.content.split(" ")[1].toLowerCase())) functionObject[message.content.split(" ")[1].toLowerCase()](message);
        else message.client.functions.message(message, {
          description: `I didn't receive a leaderboard to bring up!\n\n\`Syntax: ${message.client.functions.prefixManager(message)}leaderboard (slots)\`\nOther leaderboards are coming soon.`,
          color: message.client.functions.embed("color"),
          footer: message.client.functions.embed("footer", message)
        })
    }
}

function slotsLeaderboard(message) {
    var objectFile = JSON.parse(fs.readFileSync('./leaderboards/slots.json', 'utf-8'))

    var sortable = [];
    for (var items in objectFile) {
        sortable.push([items, objectFile[items]["money"], objectFile[items]["wins"], objectFile[items]["username"]])
    }

    if (message.content.split(" ")[2] == "wins") {
        sortable.sort(function(a, b) {
            return a[2] - b[2];
        })
    }
    else {
        sortable.sort(function(a, b) {
            return a[1] - b[1];
        })
    }

    var maxLeaderboard = 10;
    var loopNumber = 0;
    var leaderboardsString = ""

    while (loopNumber != maxLeaderboard && loopNumber < sortable.length) {
        leaderboardsString += `${loopNumber + 1}. - **${sortable[sortable.length - loopNumber - 1][3].trim()}** with **\`${sortable[sortable.length - loopNumber - 1][2]}\`** wins, and **\`$${sortable[sortable.length - loopNumber - 1][1] / 1000000}m\`** won.\n`
        loopNumber++
    }

    if (Object.keys(objectFile).includes(message.author.id)) leaderboardsString += `\n<@${message.author.id}>, you have **\`${objectFile[message.author.id].wins}\`** wins and have won **\`$${objectFile[message.author.id].money}\`** in total. Your position on the leaderboard is **${Object.keys(sortable).length - findUser(sortable, message.author.id)}/${Object.keys(sortable).length}.**`
    else leaderboardsString += `\nYou have not yet won a Slots Jackpot! Test your luck, using the **\`${message.client.functions.prefixManager(message)}slots\`** command.`

    message.client.functions.message(message, {
      title: "Vonodosh Slots Leaderboard:",
      description: leaderboardsString,
      color: message.client.functions.embed("color"),
      footer: message.client.functions.embed("footer", message)
    })
}

// for another time
function findUser(obj, id) {
  for (var i = 0; i < obj.length; i++) {
    if (obj[i][0] == id) return i + 1;
  }
}
