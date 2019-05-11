module.exports = {
	docstring : `Provides various information about the bot.`,
	usage : prefix => { return `Usage:\n\`${prefix}info\`` },
    command: message => {
			fetchInfo(message, function(guildCount, userCount) {
      	var infoUptime = "";
				var seconds = 0;
				var minutes = 0;
				var hours = 0;
				var days = 0;
				var totalUsers = 0;

				var uptime = Math.floor(message.client.uptime / 1000);
				if(uptime > 60) {
    			minutes = uptime / 60;
        	seconds = uptime % 60;
    		}

    		if(minutes > 60) {
       		hours = minutes / 60;
       		minutes = minutes % 60;
    		}
   			if(hours > 24) {
       		days = hours / 24;
       		hours = hours % 24;
   			}

    		seconds = Math.floor(seconds);
    		minutes = Math.floor(minutes);
    		hours = Math.floor(hours);
    		days = Math.floor(days);


   			if(days >= 1) {
       			infoUptime = days + " days, " + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds.";
   			}
   			else if(hours < 24  && hours >= 1 && days == 0) {
       			infoUptime = hours + " hours, " + minutes + " minutes, and " + seconds + " seconds.";
   			}
    		else if(minutes > 0 && minutes < 60 && hours == 0) {
       			infoUptime = minutes + " minutes and " + seconds + " seconds.";
   			}
   			else if(minutes == 0) {
   				infoUptime = uptime + " seconds.";
   			}
				message.client.functions.message(message, {
					color: message.client.functions.embed("color"),
					thumbnail: {
						url: message.client.user.avatarURL
					},
					fields: [
						{
							name: '**Vonodosh Info // Exciting. Interesting. Vonodosh.**',
							value: 'Bot created by Voctor. Special thanks to JCodeJ, Nokko, Yelldosh, and Alan'
						},
						{
							name: 'Info:',
							value: 'Uptime: ' + infoUptime + "\n" + "Server Count: **" + guildCount + "** with a total of **" + userCount + "** users\n" + "Usage: " + (parseInt(process.memoryUsage().heapUsed / 10000) / 100) + " mb - probably not accurate, only heap size\n" + `Prefix on this guild: \`${message.client.functions.prefixManager(message)}\``
						},
						{
							name: 'Links:',
							value: 'OAuth/Invite Link: (https://bit.ly/vonodoshoauth)\nHelp/Support Server: (https://discord.me/vonodosh)\nPatreon: (https://patreon.com/vonodosh)\nTwitter Account: (https://bit.ly/vonodoshtwitter)'
						}
					],
					timestamp: new Date(),
					footer: {
						icon_url: message.client.user.avatarURL,
						text: 'Vonodosh Info'
					}
				});
			})
    }
}

function fetchInfo(message, callback) {
	getGuilds(message, function(guildCount) {
		getUsers(message, function(userCount) {
			callback(guildCount, userCount)
		});
	});
};

function getGuilds(message, callback) {
	message.client.shard.fetchClientValues('guilds.size').then(results => {
		callback(results.reduce((prev, val) => prev + val, 0));
	}).catch(console.error);
}

function getUsers(message, callback) {
	message.client.shard.fetchClientValues('users.size').then(results => {
		callback(results.reduce((prev, val) => prev + val, 0));
	}).catch(console.error);
}
