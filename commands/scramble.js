const scrambleWords = require('../info/scramblewords.js');

module.exports = {
    docstring: `Scramble game. Unscramble a word the fastest to win!`,
    usage: prefix => {return `Usage:\n\`${prefix}scramble start\` to start the game, \`${prefix}scramble stop\` or \`${prefix}scramble end\` to stop the game.`},
    command: message => {
        if (message.channel.type == "dm") return;
        var words = message.content.toLowerCase().split(" ");
        if (words[1] == "start") {
          if (message.client.serverStatus[message.guild.id].scramble.started == true) {
            if (message.client.serverStatus[message.guild.id].scramble.running == false) {
              message.client.functions.message(message, `A Scramble game is currently not running!\nType \`${message.client.serverStatus[message.guild.id].prefix}scramble start\` to start a game!`)
              return;
            }
            message.client.functions.message(message, `A Scramble game is already running in this server! The scrambled word is:\n***${message.client.serverStatus[message.guild.id].scramble.scrambledWord}***\n\nType \`${message.client.serverStatus[message.guild.id].prefix}scramble stop\` to stop the game, if you have the *Vonodosh* or *Bot Commander* role.`)
          }
          else {
            message.client.serverStatus[message.guild.id].scramble.started = true;
            message.client.functions.message(message, "A Scramble game is about to start in 3 seconds! Be the first one to type and unscramble the word in chat, after the signal messages pops up to win!", function(msg) {

              // the amount of time before a scramble game starts
              setTimeout(function() {

                msg.delete()
                runScrambleGame(message)
              }, 3000)
            })
          }
        }
        else if (words[1] == "stop" || words[1] == "end") {
          if (message.client.serverStatus[message.guild.id].scramble.started == false) {
            message.client.functions.message(message, `A Scramble game is currently not running!\nType \`${message.client.serverStatus[message.guild.id].prefix}scramble start\` to start a game!`)
          }
          else if (message.client.functions.sufficientRoles(message, message.author) || Object.keys(message.client.masterList).includes(message.author.id)) {
            message.client.serverStatus[message.guild.id].scramble.running = false;
            message.client.serverStatus[message.guild.id].scramble.started = false;
            message.client.serverStatus[message.guild.id].scramble.time = 0;
            message.client.serverStatus[message.guild.id].scramble.unscrambledWord = false;
            message.client.serverStatus[message.guild.id].scramble.scrambledWord = false;

            message.client.functions.message(message, "The Scramble game has been stopped.")
          }
          else {
            message.client.functions.message(message, "You need to have either the *Vonodosh* role, *Bot Commander* role, or the **Administrator** permission to stop the game!")
          }
        }
        else if (words[1] == "repeat") {
          if (message.client.serverStatus[message.guild.id].scramble.running == true) {
            message.client.functions.message(message, `The current scramble word is:\n***${message.client.serverStatus[message.guild.id].scramble.scrambledWord}***`)
          }
          else {
            message.client.functions.message(message, `A Scramble game is currently not running!\nType \`${message.client.serverStatus[message.guild.id].prefix}scramble start\` to start a game!`)
          }
        }
        else {
          message.client.functions.message(message, `\`${message.client.serverStatus[message.guild.id].prefix}scramble (start, repeat, stop)\``)
        }
    },
    trigger: message =>  {
      message.client.serverStatus[message.guild.id].scramble.running = false;
      message.client.serverStatus[message.guild.id].scramble.started = false;
      message.client.serverStatus[message.guild.id].scramble.unscrambledWord = false;
      message.client.serverStatus[message.guild.id].scramble.scrambledWord = false;

      message.client.functions.message(message, `${message.author} has won the Scramble game in **${message.client.serverStatus[message.guild.id].scramble.time} seconds!**`)
      message.client.serverStatus[message.guild.id].scramble.time = 0;
    }
}

function runScrambleGame(message) {
  if (message.client.serverStatus[message.guild.id].scramble.started == false) return;

  message.client.serverStatus[message.guild.id].scramble.running = true;

  // word selecting
  message.client.serverStatus[message.guild.id].scramble.unscrambledWord = scrambleWords[Math.floor(Math.random() * scrambleWords.length)]
  message.client.serverStatus[message.guild.id].scramble.scrambledWord = shuffleLetters(message.client.serverStatus[message.guild.id].scramble.unscrambledWord.split('')).join('')

  message.client.functions.message(message, `**The Scramble game has started!**\nBe the first one to type and unscramble the following word in chat: ***${message.client.serverStatus[message.guild.id].scramble.scrambledWord}***`);
  scrambleAddTime(message)
}

function scrambleAddTime(message) {
  if (message.client.serverStatus[message.guild.id].scramble.started == false) return;

  message.client.serverStatus[message.guild.id].scramble.time += 1;
  setTimeout(function() {
    scrambleAddTime(message)
  }, 1000)
}

function shuffleLetters(array) {
    var counter = array.length;

    while (counter > 0) {
        var index = Math.floor(Math.random() * counter);
        counter--;
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
