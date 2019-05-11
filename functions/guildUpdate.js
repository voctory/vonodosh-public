// script for updating guild APIs (bots.discord.pw; bots.discordlist.net ....)
const request = require('request')
const fs = require('fs')
const keys = JSON.parse(fs.readFileSync('./info/keys.json')).guildUpdateKeys

module.exports = guildCount => {
  // is guild API updating enabled?
  if (JSON.parse(fs.readFileSync('./config.json')).guildApis != true) return;

  discordPw(guildCount, keys.discordPw);
  discordList(guildCount, keys.discordList);
}

function discordPw(guildCount, key) {
  request({
    	headers:{
			'Authorization': key,
    		'Content-Type': 'Application/JSON'
    	},
    	uri: 'https://bots.discord.pw/api/bots/192332211549241344/stats',
    	body: '{"server_count": ' + guildCount + '}',
    	method: 'POST'
	})
}

function discordList(guildCount, key) {
  request.post(
    'https://bots.discordlist.net/api',
    { form:
      { token: key,
        servers: guildCount }
    }
  )
}
