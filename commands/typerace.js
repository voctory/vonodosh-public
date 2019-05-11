const sentences = require('../info/typeracesentences.js');

module.exports = {
    docstring: `Typerace game! Beat your friends with a keyboard! In the face! For speed! Max WPM wins!`,
    usage: prefix => {return `Usage:\n\`${prefix}typerace start\` to start a game, and \`${prefix}typerace stop\` or \`${prefix}typerace end\` to stop a game.`},
    command: message => {
        if (message.channel.type == "dm") return;
        var words = message.content.toLowerCase().split(" ");
        if (words[1] == "start") {
          if (message.client.serverStatus[message.guild.id].typerace.started == true) {
            if (message.client.serverStatus[message.guild.id].typerace.running == false) {
              message.client.functions.message(message, `A Typerace game is currently not running!\nType \`${message.client.serverStatus[message.guild.id].prefix}typerace start\` to start a game!`)
              return;
            }
            message.client.functions.message(message, `A Typerace game is already running in this server! The sentence is:\n***${message.client.serverStatus[message.guild.id].typerace.sentenceFake}\n\nType \`${message.client.serverStatus[message.guild.id].prefix}***typerace stop\` to stop the game, if you have the *Vonodosh* or *Bot Commander* role.`)
          }
          else {
            message.client.serverStatus[message.guild.id].typerace.started = true;
            message.client.functions.message(message, "A Typerace game is about to start in 3 seconds! Be the first one to type the sentence in chat, after the signal messages pops up to win!", function(msg) {

              // the amount of time before a typerace game starts
              setTimeout(function() {

                msg.delete()
                runTyperaceGame(message)
              }, 3000)
            })
          }
        }
        else if (words[1] == "stop" || words[1] == "end") {
          if (message.client.serverStatus[message.guild.id].typerace.started == false) {
            message.client.functions.message(message, `A Typerace game is currently not running!\nType \`${message.client.serverStatus[message.guild.id].prefix}typerace start\` to start a game!`)
          }
          else if (message.client.functions.sufficientRoles(message, message.author) || Object.keys(message.client.masterList).includes(message.author.id)) {
            message.client.serverStatus[message.guild.id].typerace.running = false;
            message.client.serverStatus[message.guild.id].typerace.started = false;
            message.client.serverStatus[message.guild.id].typerace.time = 0;
            message.client.serverStatus[message.guild.id].typerace.sentenceReal = false;
            message.client.serverStatus[message.guild.id].typerace.sentenceFake = false;

            message.client.functions.message(message, "The Typerace game has been stopped.")
          }
          else {
            message.client.functions.message(message, "You need to have either the *Vonodosh* role, *Bot Commander* role, or the **Administrator** permission to stop the game!")
          }
        }
        else if (words[1] == "repeat") {
          if (message.client.serverStatus[message.guild.id].typerace.running == true) {
            message.client.functions.message(message, `The current sentence is:\n***${message.client.serverStatus[message.guild.id].typerace.sentenceFake}***\n\nMake sure that you type the sentence as it is (punctuation, capitalization, etc). Copying and pasting won't work.`)
          }
          else {
            message.client.functions.message(message, `A Typerace game is currently not running!\nType \`${message.client.serverStatus[message.guild.id].prefix}typerace start\` to start a game!`)
          }
        }
        else {
          message.client.functions.message(message, `\`${message.client.serverStatus[message.guild.id].prefix}typerace (start, repeat, stop)\``)
        }
    },
    trigger: message =>  {
      message.client.serverStatus[message.guild.id].typerace.running = false;
      message.client.serverStatus[message.guild.id].typerace.started = false;
      message.client.serverStatus[message.guild.id].typerace.sentenceReal = false;
      message.client.serverStatus[message.guild.id].typerace.sentenceFake = false;

      message.client.functions.message(message, `${message.author} has won the Typerace game in **${message.client.serverStatus[message.guild.id].typerace.time} seconds!**`)
      message.client.serverStatus[message.guild.id].typerace.time = 0;
    },
    similar: (message) => {
      return Math.floor(similarity(message.content, message.client.serverStatus[message.guild.id].typerace.sentenceReal) * 100)
    }
}

function runTyperaceGame(message) {
  if (message.client.serverStatus[message.guild.id].typerace.started == false) return;

  message.client.serverStatus[message.guild.id].typerace.running = true;

  // sentence selecting
  message.client.serverStatus[message.guild.id].typerace.sentenceReal = sentences[Math.floor(Math.random() * sentences.length)]
  message.client.serverStatus[message.guild.id].typerace.sentenceFake = message.client.serverStatus[message.guild.id].typerace.sentenceReal.split("").join("\u200B");

  message.client.functions.message(message, `**The Typerace game has started!**\nBe the first one to type the following sentence in chat:\n\n*${message.client.serverStatus[message.guild.id].typerace.sentenceFake}*\nMake sure that you type the sentence as it is (punctuation, capitalization, etc). Copying and pasting won't work.`);
  typeraceAddTime(message)
}

function typeraceAddTime(message) {
  if (message.client.serverStatus[message.guild.id].typerace.started == false) return;

  message.client.serverStatus[message.guild.id].typerace.time += 1;
  setTimeout(function() {
    typeraceAddTime(message)
  }, 1000)
}

// some code from stack overflow
// https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely

function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

// end of stack overflow code
