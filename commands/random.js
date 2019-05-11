module.exports = {
    docstring: `Random game! Guess a randomly generated number for great profit.`,
    usage: prefix => {return `Usage:\n\`${prefix}random start\` to start a game, \`${prefix}random stop\` or \`${prefix}random end\` to stop a game. Guess the number with \`${prefix}random guess 12345\``},
    command: message => {
        if (message.channel.type == "dm") return;
        var words = message.content.toLowerCase().split(" ");
        if (words[1] == "start") {
          if (message.client.serverStatus[message.guild.id].random.started == true) {
            if (message.client.serverStatus[message.guild.id].random.running == false) {
              message.client.functions.message(message, `A Random game is currently not running!\nType \`${message.client.serverStatus[message.guild.id].prefix}random start\` to start a game!`)
              return;
            }
            message.client.functions.message(message, `A Random game is already running in this server! The number range is between ***${message.client.serverStatus[message.guild.id].random.firstHint} and ${message.client.serverStatus[message.guild.id].random.secondHint}***,\n\nType \`${message.client.serverStatus[message.guild.id].prefix}random stop\` to stop the game, if you have the *Vonodosh* or *Bot Commander* role.`)
          }
          else {
            message.client.serverStatus[message.guild.id].random.started = true;
            message.client.functions.message(message, "A Random game is about to start in 3 seconds! Be the first one to type the correct number in chat, after the signal messages pops up to win!", function(msg) {

              // the amount of time before a random game starts
              setTimeout(function() {

                msg.delete()
                runRandomGame(message)
              }, 3000)
            })
          }
        }
        else if (words[1] == "guess") {
          if (message.client.serverStatus[message.guild.id].random.started == false) {
            message.client.functions.message(message, `A Random game is currently not running!\nType \`${message.client.serverStatus[message.guild.id].prefix}random start\` to start a game!`)
          }
          else if (parseInt(words[2]) >= message.client.serverStatus[message.guild.id].random.firstHint && parseInt(words[2]) <= message.client.serverStatus[message.guild.id].random.secondHint) {
            var parsedNumber = parseInt(words[2]);
            if (parsedNumber > message.client.serverStatus[message.guild.id].random.target) {
              message.client.functions.message(message, `The chosen number is smaller than **${parsedNumber}**.`)
            }
            else if (parsedNumber < message.client.serverStatus[message.guild.id].random.target) {
              message.client.functions.message(message, `The chosen number is bigger than **${parsedNumber}**.`)
            }
            else if (parsedNumber == message.client.serverStatus[message.guild.id].random.target) {
              message.client.functions.message(message, `${message.author} has won the Random game in **${message.client.serverStatus[message.guild.id].random.time} seconds!**\nThe correct number was ${message.client.serverStatus[message.guild.id].random.target}.`)

              message.client.serverStatus[message.guild.id].random.running = false;
              message.client.serverStatus[message.guild.id].random.started = false;
              message.client.serverStatus[message.guild.id].random.time = 0;
              message.client.serverStatus[message.guild.id].random.target = false;
              message.client.serverStatus[message.guild.id].random.firstHint = false;
              message.client.serverStatus[message.guild.id].random.secondHint = false;
            }
            else {
              message.client.functions.message(message, "Something just went wrong. Contact one of the Vonodosh developers. Don't call 911.")
            }
          }
          else {
            message.client.functions.message(message, `Your answer isn't in the guess range. The number is between ***${message.client.serverStatus[message.guild.id].random.firstHint} and ${message.client.serverStatus[message.guild.id].random.secondHint}***.`)
          }
        }
        else if (words[1] == "stop" || words[1] == "end") {
          if (message.client.serverStatus[message.guild.id].random.started == false) {
            message.client.functions.message(message, `A Random game is currently not running!\nType \`${message.client.serverStatus[message.guild.id].prefix}random start\` to start a game!`)
          }
          else if (message.client.functions.sufficientRoles(message, message.author) || Object.keys(message.client.masterList).includes(message.author.id)) {
            message.client.serverStatus[message.guild.id].random.running = false;
            message.client.serverStatus[message.guild.id].random.started = false;
            message.client.serverStatus[message.guild.id].random.time = 0;
            message.client.serverStatus[message.guild.id].random.target = false;
            message.client.serverStatus[message.guild.id].random.firstHint = false;
            message.client.serverStatus[message.guild.id].random.secondHint = false;

            message.client.functions.message(message, "The Random game has been stopped.")
          }
          else {
            message.client.functions.message(message, "You need to have either the *Vonodosh* role, *Bot Commander* role, or the **Administrator** permission to stop the game!")
          }
        }
        else if (words[1] == "repeat") {
          if (message.client.serverStatus[message.guild.id].random.running == true) {
            message.client.functions.message(message, `The current number range is between ***${message.client.serverStatus[message.guild.id].random.firstHint} and ${message.client.serverStatus[message.guild.id].random.secondHint}***.\nUse \`${message.client.serverStatus[message.guild.id].prefix}random guess (your number)\` to guess a number.`)
          }
          else {
            message.client.functions.message(message, `A Random game is currently not running!\nType \`${message.client.serverStatus[message.guild.id].prefix}random start\` to start a game!`)
          }
        }
        else {
          message.client.functions.message(message, `\`${message.client.serverStatus[message.guild.id].prefix}random (start, guess, repeat, stop)\``)
        }
    }
    /*trigger: message =>  {
      message.client.serverStatus[message.guild.id].random.running = false;
      message.client.serverStatus[message.guild.id].random.started = false;
      message.client.serverStatus[message.guild.id].random.sentenceReal = false;
      message.client.serverStatus[message.guild.id].random.sentenceFake = false;

      message.client.functions.message(message, `${message.author} has won the Random game in **${message.client.serverStatus[message.guild.id].random.time} seconds!**`)
      message.client.serverStatus[message.guild.id].random.time = 0;
    }*/

    // trigger not needed for this game
}

function runRandomGame(message) {
  if (message.client.serverStatus[message.guild.id].random.started == false) return;

  message.client.serverStatus[message.guild.id].random.running = true;

  // sentence selecting
  message.client.serverStatus[message.guild.id].random.target = Math.floor((Math.random()* 10000) + 1);
  message.client.serverStatus[message.guild.id].random.firstHint = message.client.serverStatus[message.guild.id].random.target - Math.floor((Math.random()* 2000) + 1);
  message.client.serverStatus[message.guild.id].random.secondHint = message.client.serverStatus[message.guild.id].random.target + Math.floor((Math.random()* 3000) + 1);

  message.client.functions.message(message, `**The Random game has started!**\nBe the first one to guess the correct number in chat. The number range is between ***${message.client.serverStatus[message.guild.id].random.firstHint} and ${message.client.serverStatus[message.guild.id].random.secondHint}***.\nUse \`${message.client.serverStatus[message.guild.id].prefix}random guess (your number)\` to guess a number.`);
  randomAddTime(message)
}

function randomAddTime(message) {
  if (message.client.serverStatus[message.guild.id].random.started == false) return;

  message.client.serverStatus[message.guild.id].random.time += 1;
  setTimeout(function() {
    randomAddTime(message)
  }, 1000)
}
