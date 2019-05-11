const Discord = require('./node_modules/discord.js');
const Manager = new Discord.ShardingManager('./main.js');

Manager.spawn(2);