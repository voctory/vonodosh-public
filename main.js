let discord = require('./node_modules/discord.js'),
	bot = new discord.Client(),
	fs = require('fs');

const commands = require('./commands/commands.js'),
	list = Object.keys(commands),
	globalCommands = require('./commands/globalcommands.js'),
	globalList = Object.keys(globalCommands),
	functionList = require('./functions/functions.js'),
	aftertouch = require('./functions/aftertouch.js'),
	cooldown = [],
	cooldownSeconds = 4,
	globalPrefix = JSON.parse(fs.readFileSync('./info/prefix.json'))["0"],
  antiInviteFilePath = './info/anti_invite.json',
	patrons = JSON.parse(fs.readFileSync('./info/patrons.json'));

bot.on('message', message => {
	// avatar switching and server count saves
	if (message.author.bot) {
		message.client.functions.avatarSwitch(message.client.user)
		message.client.functions.saveServerCount(message.client)
	}


	if (message.author.id === bot.user.id) aftertouch(message); //apply aftertouch
	if (message.author.bot) return;
	//console.log(bot.serverStatus)

	// checking to see if guilds are available
	//if (message.channel.type !== "dm") if (message.guild.available == false) return;

	var first = message.content.split(" ")[0];

	// global command checker
	if (globalList.includes(first.toLowerCase().slice(globalPrefix.length, first.length)) && message.content.startsWith(globalPrefix)) {
	  if (cooldown[message.author.id] != undefined) {
			if (cooldown[message.author.id].status == true && !Object.keys(JSON.parse(fs.readFileSync('./info/masterlist.json', 'utf-8'))).includes(message.author.id)) {
		  	if (cooldown[message.author.id].sent != true) {
					cooldown[message.author.id].sent = true;
					message.client.functions.message(message, {
						description: `<@${message.author.id}>, you are currently on a cooldown! You need to wait **${cooldown[message.author.id].time} more second/s** to use another command.`,
						color: message.client.functions.embed("color")
					}, function(msg) {
						deleteCooldownMessage(message.author.id, msg)
					});
				}
				return; }
		};
		let commandTrigger = first.toLowerCase().slice(globalPrefix.length, first.length);
	  globalCommands[commandTrigger].command(message);
		message.client.functions.commandStatistics(commandTrigger);
		startCooldown(message.author.id);
	}

	// regular command checker
	else if (message.channel.type != "dm") {
		if (list.includes(first.toLowerCase().slice(message.client.serverStatus[message.guild.id].prefix.length, first.length)) && message.content.startsWith(message.client.serverStatus[message.guild.id].prefix)) {
			if (cooldown[message.author.id] != undefined) {
			if (cooldown[message.author.id].status == true && !Object.keys(JSON.parse(fs.readFileSync('./info/masterlist.json', 'utf-8'))).includes(message.author.id)) {
				if (cooldown[message.author.id].sent != true) {
					cooldown[message.author.id].sent = true;
					message.client.functions.message(message, {
						description: `<@${message.author.id}>, you are currently on a cooldown! You need to wait **${cooldown[message.author.id].time} more second/s** to use another command.`,
						color: message.client.functions.embed("color")
					}, function(msg) {
						deleteCooldownMessage(message.author.id, msg)
					})
				}
				return }
			};
			let commandTrigger = first.toLowerCase().slice(message.client.serverStatus[message.guild.id].prefix.length, first.length)
			commands[commandTrigger].command(message);
			message.client.functions.commandStatistics(commandTrigger);
			startCooldown(message.author.id);
		}
	}


	// conditions for games
	if (message.channel.type != "dm") {

		// reflex check
		if (message.content.toLowerCase().trim() == "reflex") {
			if (message.client.serverStatus[message.guild.id].reflex.running == true && message.client.serverStatus[message.guild.id].reflex.started == true) {
				// send game and msg object to the gameHandler
				message.client.functions.gameHandler({game: "reflex", message: message})
				return;
			}
		}
		if (message.client.serverStatus[message.guild.id].typerace.running == true && typeof message.client.serverStatus[message.guild.id].typerace.sentenceFake == "string") {
			let similarityCall = commands["typerace"].similar(message)
			if (message.content.trim() == message.client.serverStatus[message.guild.id].typerace.sentenceReal.trim()) {
				// send game and msg object to the gameHandler
				message.client.functions.gameHandler({game: "typerace", message: message})
				return;
			}
			else if (similarityCall >= 90) {
				message.client.functions.message(message, `${message.author}, your message resembled **${similarityCall}%** of the Typerace sentence!`)
			}
		}
		if (message.client.serverStatus[message.guild.id].scramble.running == true && typeof message.client.serverStatus[message.guild.id].scramble.scrambledWord == "string") {
			if (message.content.toLowerCase().trim() == message.client.serverStatus[message.guild.id].scramble.unscrambledWord.trim().toLowerCase()) {
				// send game and msg object to the gameHandler
				message.client.functions.gameHandler({game: "scramble", message: message})
				return;
			}
		}
	}
    //anti-invite
  if (message.channel.type != "dm") if (bot.antiInviteList.enabled.includes(message.guild.id) && message.channel.type !== "dm" && message.author.id !== bot.user.id){  //don't trigger in DM's, that's weird 0.0
        if (message.cleanContent.match(/discord\.me\/.*\w|gg\/.*\w/)){
            message.delete().catch()
            message.client.functions.message(message, `${message.author}, this server does not allow invite links!`)
        }
    }
})

bot.on('messageUpdate', (oldMessage, newMessage) => {
	//more anti-invite
	if (newMessage.channel.type != "dm") if (bot.antiInviteList.enabled.includes(newMessage.guild.id) && newMessage.channel.type !== "dm" && newMessage.author.id !== bot.user.id){  //don't trigger in DM's, that's weird 0.0
        if (newMessage.cleanContent.match(/discord\.me\/.*\w|gg\/.*\w/)){
            newMessage.delete().catch()
            newMessage.client.functions.message(newMessage, `${newMessage.author}, this server does not allow invite links!`)
        }
    }
})

bot.on('ready', err => {
	console.log("Online!", `Logged in as ${bot.user}, or ${bot.user.username}`);

	bot.functions = functionList;
	bot.readyStatus = false;
	bot.masterList = JSON.parse(fs.readFileSync('./info/masterlist.json', 'utf-8'));
    bot.antiInviteList = JSON.parse(fs.readFileSync(antiInviteFilePath, 'utf-8'));
    bot.antiInvitePath = antiInviteFilePath

	bot.functions.serverCount(bot);

	if (err) {
		console.log(err);
		process.exit()
	}

	// initializing servers with prefixes, game statuses
	bot.functions.createServers(bot, function(array, param) {
	  if (param == true) {
			bot.serverStatus = array;
			bot.readyStatus = true;
			console.log("Connected to servers:")
			if (bot.serverStatus.length < 4)
				console.log(bot.serverStatus.join("\n"))
			else
				console.log(bot.serverStatus.slice(0,3).join("\n"), `\n ...and ${bot.serverStatus.slice(3).length} more`)
	} else {
		process.exit(1);
		}
	});

});
	// setting up some outside functions

bot.on('guildCreate', guild => {
  bot.functions.newServer(guild);
	bot.functions.serverCount(bot);
})

bot.on('guildDelete', guild => {
	bot.functions.serverCount(bot);
})

function deleteCooldownMessage(id, message) {
	setTimeout(function() {
		message.edit("", {
			embed: {
				description: `<@${id}>, your cooldown is up!`,
				color: message.client.functions.embed("color")}
			}).then(msg => setTimeout(function() {
				msg.delete()
			}, 10000))
		}, Number(cooldown[id].time.toString() + "000"));
}

function startCooldown(id) {
	if (patrons.overall.includes(id)) {
		if (Object.keys(patrons.bronze).includes(id)) {
			cooldown.push(id);
			cooldown[id] = {};
			cooldown[id].status = true;
			cooldown[id].time = Math.floor(cooldownSeconds / 2);
			timing(id)
		}
		else if (Object.keys(patrons.silver).includes(id)) {
			return;
		}
	}
	else if (cooldown[id] == undefined) {
		cooldown.push(id);
		cooldown[id] = {};
		cooldown[id].status = true;
		cooldown[id].time = cooldownSeconds;
		timing(id)
	}
	else if (cooldown[id].status != true) {
		cooldown[id].status = true;
		cooldown[id].time = cooldownSeconds;
		timing(id)
	}
}

function timing(id) {
	if (cooldown[id].time != 0) { cooldown[id].time--; setTimeout(function() { timing(id) }, 1000) }
	else if (cooldown[id].time == 0) { cooldown[id].status = false; cooldown[id].sent = false }
}


bot.login(JSON.parse(fs.readFileSync('./info/keys.json', "utf-8")).discord4)
/* Nomenclature in terms of keys.json:
 * If you are a dev who has the dev keys.json:
 * discord points to Vonodosh DEV.
 * discord1 points to KelpBot.
 * discord2 points to Bolt.
 * discord3 points to Davy.
 * You can guess what realvonodoshbecareful points to.
*/
