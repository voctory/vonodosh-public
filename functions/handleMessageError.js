module.exports = message => {
  message.catch(e => message.channel.sendMessage(`The message was too big to send.\n\n${e}`))
}
