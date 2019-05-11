module.exports = {
  docstring: "The Server command. Returns an invite link to Vonodosh's support server.",
  usage: prefix => { return `Usage\n\`${prefix}server\`` },
  command: message => {
    // using traditional way of sending messages to avoid errors
    message.author.sendMessage(`**The Invite link to Vonodosh Discord: https://discord.me/vonodosh**\nIf the first link doesn't work for you, use this one: https://discord.gg/UVAv72A`)
  }
}
