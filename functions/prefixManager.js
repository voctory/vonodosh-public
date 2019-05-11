var fs = require('fs');

module.exports = message => {
  if (message.channel.type == "dm") return require('../info/prefix.json')["0"]

  var file = JSON.parse(fs.readFileSync('./info/prefix.json', 'utf-8'))
  if (!Object.keys(file).includes(message.guild.id)) return require('../info/prefix.json')["0"]
  else return file[message.guild.id]
}
