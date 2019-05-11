var fs = require('fs');

module.exports = {
    docstring: `Prefix command. Sets the server-wide prefix for the bot.\nRequirements: You must have the "Manage Server" permission in order to use this command.`,
    usage: prefix => {return `Usage\n\`${prefix}setprefix <prefix>\``},
    command: function(message) {
      if (message.channel.type == "dm") {
        message.client.functions.message(message.author, "You can't set a custom prefix in DMs!");
        return;
      }

        if (message.content.split(" ").length == 1) { message.client.functions.message(message, "You didn't specify a prefix!\n\`Syntax: -setprefix (new_prefix)\`"); return; }
        if (!message.member.hasPermission("MANAGE_GUILD") && !Object.keys(JSON.parse(fs.readFileSync('./info/masterlist.json'))).includes(message.member.id)) {
          message.client.functions.message(message, "You don't have the `Manage Server` permission, which is required to change the server's prefix!");
          return;
        }

        let firstFile = JSON.parse(fs.readFileSync('./info/prefix.json', 'utf-8'))
        message.client.serverStatus[message.guild.id].prefix = message.content.split(" ")[1]
        if (Object.keys(firstFile).includes(message.guild.id)) {
          firstFile[message.guild.id] = message.content.split(" ")[1];
          fs.writeFileSync('./info/prefix.json', JSON.stringify(firstFile), 'utf-8');
          message.client.functions.message(message, `This guild's prefix has been set to \`${firstFile[message.guild.id]}\``)
        }
        else {
          firstFile[message.guild.id] = message.content.split(" ")[1];
          fs.writeFileSync('./info/prefix.json', JSON.stringify(firstFile), 'utf-8');
          message.client.functions.message(message, `**This guild's prefix has been set to \`${firstFile[message.guild.id]}\`.**`)
        }
    }
}
