module.exports = {
  docstring: "The Invite command. Returns a link for you to invite Vonodosh to your server.",
  usage: prefix => { return `Usage:\n\`${prefix}invite\`` },
  command: message => {
    message.client.functions.message(message.author, `**My Invite link: https://bit.ly/vonodoshoauth**\n*If you have a permission called 'Manage Server' in the server you want to invite me to, you will be able to add me.*\n\nIf the first link doesn't work for you, use this one: https://discordapp.com/oauth2/authorize?client_id=192332191240421377&scope=bot&permissions=536083519`)
  }
}
