/*Phantom.js integration module
This will be buggy, I guarantee it*/
const phantom = require('phridge'),
	  fs = require('fs');

let brokenstring = "Sorry, but this command is NOT IN A USABLE STATE right now. Try again in a couple of versions.\n*Or bug nokko until it works.*"
    // serverlist = fs.readFileSync('./info/phantomservers.json').split(','),
	masterlist = JSON.parse(fs.readFileSync('./info/masterlist.json')),
	clist = {
		"screenshot" : function(msg) {
		if (!masterlist.hasOwnProperty(msg.channel.guild.id)){
		} else {
			msg.client.functions.message(message, "This server is not authorized to use phantom commands! Ask a nice person to `phantom authorize` your guild.");
		}
	},

		"authorize" : function(msg) {
			if (masterlist.hasOwnProperty(msg.author.id)){
				if (!Object.keys(masterlist.hasOwnProperty(msg.channel.guild.id))){
					masterlist[msg.channel.guild.id] = true;
					fs.writeFileSync('./info/prefix.json', JSON.stringify(masterlist), 'utf-8');
				} else {
					msg.client.functions.message(msg, {
					description: "Listen up!\nYeah, you're already authorized.",
					footer: msg.client.functions.embed(footer),
					});
				}
			}else{
				msg.client.functions.message(msg, {
				description: ```You... ARE A MUGGLE!```
				})

			}
		}
	},
	fclist = clist.toString().split(',').join('\n'); //sure wish there was a better way to do this...

module.exports = {
	docstring : brokenstring, // "Phantom.js module, does a lot of the stuff a browser might do.\n You must be on a whitelisted server to use this command.",
	usage : prefix => {return brokenstring}, // `Usage: \n \`phantom <command>\` \n Available commands are: ${fclist}`,//${prefix}
	command: (msg) => {
		msg.client.functions.message(msg, {
			description: brokenstring
		})
		// let cont = msg.content,
		//     amsg = cont.split(' ');
		// if (amsg.length === 2){
		//     if (clist[amsg[1]] !== undefined){
		//         clist[amsg[1]](msg)
		//     }
		// } else {
		//  msg.channel.sendMessage(`That is not a valid phantom command! Available commands are: ${fclist}`).catch((err) => {console.log(err)})
		}
	};
