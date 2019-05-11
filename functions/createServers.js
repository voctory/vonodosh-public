var fs = require('fs');

module.exports = (bot, callback) => {
    let serverStatus = [];
    for (var i = 0; i < Array.from(bot.guilds).length; i++) {
        serverStatus.push(Array.from(bot.guilds)[i][0]);
        serverStatus[Array.from(bot.guilds)[i][0]] = JSON.parse(fs.readFileSync('./info/defaultServerStatus.json', 'utf-8'));
        serverStatus[Array.from(bot.guilds)[i][0]].prefix = require('../info/prefix.json')["0"];
        if (fs.readFileSync('./info/toggleEmbeds.json', 'utf-8').indexOf(Array.from(bot.guilds)[i][0]) != -1) serverStatus[Array.from(bot.guilds)[i][0]].embeds = false;
        if (Object.keys(JSON.parse(fs.readFileSync('./info/prefix.json', 'utf-8'))).includes(Array.from(bot.guilds)[i][0])) serverStatus[Array.from(bot.guilds)[i][0]].prefix = JSON.parse(fs.readFileSync('./info/prefix.json', 'utf-8'))[Array.from(bot.guilds)[i][0]]
        if (i + 1 == Array.from(bot.guilds).length) { callback(serverStatus, true)  }
    }
}
