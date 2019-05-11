var fs = require('fs')

module.exports = (guild, message) => {
  if (!guild.client.serverStatus.hasOwnProperty(guild.id)) guild.client.serverStatus[guild.id] = JSON.parse(fs.readFileSync('./info/defaultServerStatus.json', 'utf-8'));
  guild.client.serverStatus[guild.id].prefix = require('../info/prefix.json')["0"];
  guild.client.functions.serverCount(guild.client);
}
