module.exports = {
    docstring: `Reflex game. React faster than your comrades! (or get a gigabit connection, you plebian.)`,
    usage: prefix => {return `Usage:\n\`${prefix}reflex start\` to start the game, \`${prefix}reflex stop\` or \`${prefix}reflex end\` to stop the game.`},
    command: message => {
        if (message.channel.type == "dm") return;
        var words = message.content.toLowerCase().split(" ");
        if (words[1] == "start") {
          if (message.client.serverStatus[message.guild.id].reflex.started == true) {
            message.client.functions.message(message, `A Reflex game is already running in this server!\nType \`${message.client.serverStatus[message.guild.id].prefix}reflex stop\` to stop the game, if you have the *Vonodosh* or *Bot Commander* role.`)
          }
          else {
            message.client.serverStatus[message.guild.id].reflex.started = true;
            message.client.functions.message(message, "A Reflex game is about to start! Be the first one to type **`reflex`** in chat, after the signal messages pops up to win!", function(msg) {

              // the amount of time before a reflex game starts
              setTimeout(function() {

                msg.delete()
                runReflexGame(message)
              }, Math.floor((Math.random() * 8000) + 3000))
            })
          }
        }
        else if (words[1] == "stop" || words[1] == "end") {
          if (message.client.serverStatus[message.guild.id].reflex.started == false) {
            message.client.functions.message(message, `A Reflex game is currently not running!\nType \`${message.client.serverStatus[message.guild.id].prefix}reflex start\` to start a game!`)
          }
          else if (message.client.functions.sufficientRoles(message, message.author) || Object.keys(message.client.masterList).includes(message.author.id)) {
            message.client.serverStatus[message.guild.id].reflex.running = false;
            message.client.serverStatus[message.guild.id].reflex.started = false;
            message.client.serverStatus[message.guild.id].reflex.time = 0;

            message.client.functions.message(message, "The Reflex game has been stopped.")
          }
          else {
            message.client.functions.message(message, "You need to have either the *Vonodosh* role, *Bot Commander* role, or the **Administrator** permission to stop the game!")
          }
        }
        else {
          message.client.functions.message(message, `\`${message.client.serverStatus[message.guild.id].prefix}reflex (start, stop)\``)
        }
    },
    trigger: message =>  {
      message.client.serverStatus[message.guild.id].reflex.running = false;
      message.client.serverStatus[message.guild.id].reflex.started = false;

      message.client.functions.message(message, `${message.author} has won the Reflex game in **${message.client.serverStatus[message.guild.id].reflex.time}MS** (milliseconds)!`)
      message.client.serverStatus[message.guild.id].reflex.time = 0;
    }
}

function runReflexGame(message) {
  if (message.client.serverStatus[message.guild.id].reflex.started == false) return;

  message.client.functions.message(message, "**The Reflex game has started!**\nBe the first one to type **`reflex`** in chat!", function(msg) {
    message.client.serverStatus[message.guild.id].reflex.running = true;
    reflexAddTime(message);
  })
}

function reflexAddTime(message) {
  if (message.client.serverStatus[message.guild.id].reflex.started == false) return;

  message.client.serverStatus[message.guild.id].reflex.time += 10;
  setTimeout(function() {
    reflexAddTime(message)
  }, 10)
}
