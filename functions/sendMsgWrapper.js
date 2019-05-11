const { Message, User, Guild, DMChannel } = require('discord.js');

module.exports = (message, obj, callback) => {
  if (obj == undefined || obj == null) return;

  if (typeof obj == "string") {
	   permissionChecker(obj, message, function(arg) {
	      if (arg == "send") {
          channelCheck(message).sendMessage("I don't have permission to send messages!").catch();
          return
        }
	   })
	   channelCheck(message).sendMessage(obj)
	    .then(msg => checkCallback(callback, msg))
	    .catch(e => channelCheck(message).sendMessage(`**I couldn't send the message.**\n\n\`${e}\``).catch())
  }
  else if (typeof obj == "object") {
	   var rejected = false;
	   permissionChecker(obj, message, function(arg) {
	      if (arg == "send") { channelCheck(message).sendMessage("I don't have permission to send messages!").catch(); rejected = true; return }
	      if (arg == "embed") { channelCheck(message).sendMessage("I don't have permission to send embedded messages!").catch(); rejected = true; return }
	   })
	   if (rejected == true) return;
	   channelCheck(message).sendEmbed(obj)
	    .then(msg => checkCallback(callback, msg))
	    .catch(e => channelCheck(message).sendMessage(`**I couldn't send the message.**\n\n\`${e}\``).catch())
  }
}

function permissionChecker(obj, message, callback) {
  // voctor messing around with DM glitch
  if (message instanceof User) return
  else if (message.channel instanceof DMChannel) return
  else if (!message.guild.member(message.client.user).permissionsIn(channelCheck(message)).hasPermission("SEND_MESSAGES")) callback("send")
  else if (!message.guild.member(message.client.user).permissionsIn(channelCheck(message)).hasPermission("EMBED_LINKS")) callback("embed")
}

function checkCallback(callback, msg) {
  if (callback) callback(msg)
}

function channelCheck(obj) {
  if (obj instanceof User) return obj;
  else if (obj.channel instanceof DMChannel) return obj.author
  else if (obj instanceof Message) return obj.channel;
  else { console.log(`Something must've went wrong? Here's the message object:\n\n${obj}`); return obj }
}
