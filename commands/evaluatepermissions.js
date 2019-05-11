module.exports = {
  docstring: `Retreives a specified user's permission information. Perms are displayed in a format that's only useful to devs, really.`,
	usage: prefix => {return `Usage:\n\`perms <user>\``},
  command: message => {
    if (Array.from(message.mentions.users).length == 0) {
      var permissionsObj = message.guild.member(message.author).permissions.serialize();
      var permissionsList = "";

      for (let i in permissionsObj) permissionsList += `**${i}** - *${permissionsObj[i]}*\n`;
      message.client.functions.message(message.author, {
        title: `Evaluated Permissions for ${message.author.username}#${message.author.discriminator}`,
        description: permissionsList,
        color: message.client.functions.embed("color"),
        footer: message.client.functions.embed("footer", message)
      })
    }
    else {
      var permissionsObj = message.guild.member(Array.from(message.mentions.users)[0][1]).permissions.serialize();
      var permissionsList = "";

      for (let i in permissionsObj) permissionsList += `**${i}** - *${permissionsObj[i]}*\n`;
      message.client.functions.message(message.author, {
        title: `Evaluated Permissions for ${Array.from(message.mentions.users)[0][1].username}#${Array.from(message.mentions.users)[0][1].discriminator}`,
        description: permissionsList,
        color: message.client.functions.embed("color"),
        footer: message.client.functions.embed("footer", message)
      })
    }
  }
}
