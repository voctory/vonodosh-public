var fs = require('fs');

module.exports = {
    docstring: `Prefix command. Resets the server-wide prefix for the bot.\nRequirements: You must have the "Manage Server" permission in order to use this command.`,
    usage: prefix => { return `Usage\n\`${prefix}resetprefix \``},
    command: function(message) {
      if (message.channel.type == "dm") {
        message.client.functions.message(message.author, "You can't set a custom prefix in DMs!");
        return;
      }

        if (!message.member.hasPermission("MANAGE_GUILD") && !Object.keys(JSON.parse(fs.readFileSync('./info/masterlist.json'))).includes(message.member.id)) {
            message.client.functions.message(message, "You don't have the `Manage Server` permission, which is required to change the server's prefix!"); return;
        }
        var firstFile = JSON.parse(fs.readFileSync('./info/prefix.json', 'utf-8'))
        message.client.serverStatus[message.guild.id].prefix = JSON.parse(fs.readFileSync('./info/prefix.json'))[0];
        if (Object.keys(firstFile).includes(message.guild.id)) { delete firstFile[message.guild.id]; fs.writeFileSync('./info/prefix.json', JSON.stringify(firstFile), 'utf-8') }
        message.client.functions.message(message, `**This guild's prefix has been reset.**`)
    }
}
