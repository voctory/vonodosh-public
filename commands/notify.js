//this command is kinda bad
//that's about it
//please for all that is good in this world don't test it on any actual servers
//and try not to use it in general
// /shrug/

module.exports = {
	docstring: "***THIS COMMAND IS NOT USABLE BY ANYONE EXCEPT BOT DEVELOPERS!***\n***DEVELOPERS ARE URGED TO BE CAREFUL WHEN USING THIS COMMAND!!!***\n***NOTIFY IS A GLOBAL MODULE THAT ENABLES VONODOSH TO DO VARIOUS GUILD ADMINISTRATION AND UPDATE TASKS.***\n***THIS COMMAND IS NOT AVAILABLE TO VONODOSH USERS FOR FAIRLY OBVIOUS REASONS.***",
	usage: prefix => { return `***THIS IS A SERIOUSLY TERRIBLE COMMAND, EXCERCISE CAUTION WHEN USING IT.*** \n *USAGE:* ***\`${prefix}notify <serverMask> <MESSAGE>\`***\n***THIS COMMAND WILL TELL YOU WHAT YOU ARE DOING AND ASK FOR CONFIRMATION BEFORE SENDING A NOTIFY.***`},
	command: message => {
		// if (typeof(message) === "string"){
		// 	if (message === "cancel"){
		// 		return message => {
		// 			notifyCancel(message);
		// 			message.client.functions.message("Notify cancelled.");
		// 		}
		// 	} else
		// 	if (message === "confirm"){
		// 		return message => {
		// 			notifyConfirm(message);
		// 		}
		// 	}
		// } else if (message.author.id === "165693831218462720"){ //only usable by nokko right now.
		// 	words = message.content.split(" ")
		// 	args = {}
		// 	words.slice(2).forEach(element => {
		// 		i = 0;
		// 		values = ['command', 'serverMask', 'message']
		// 		args.values[i] = element;
		// 	})
		// 	confirmMessage = notifyArgs(args, message);
		// 	notifyAsk(confirmMessage, message);
		// } else {
		// 	notifyDeny(message)
		// }
		console.log(`${message.author.id} is using notify`)
	}
}

function notifyDo(message) {
	let mask = message.client.serverStatus[message.guild.id].notify.mask
	console.log(mask)
}

function generateConfirmation(){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( let i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function notifyAsk(request, message) {
	console.log(request)

	if (message.client.serverStatus[message.guild.id].notify.requested === true){
		message.client.functions.message(`There is already a notify request in place. Rectify this issue!\nRestarts might break the request state. Careful!`)
	} else if (request !== undefined){
		message.client.serverStatus[message.guild.id].notify.requested = true //make sure the modules know what's up, yo.
		message.client.functions.message(`You are about to ${request[1]}. To proceed with this action, confirm it with ${request[confirmationFake]}`)
	} else {
		notifyDeny(message)
	}
}

// -notify_cancel
// THE REQUEST HAS FAILED
//reset all status variables
function notifyCancel(message) {
	let status = message.client.serverStatus[message.guild.id].notify
	status.requested = false
	status.requestedUserID = ""
	status.mask = ""
	status.confirmation = false
}

//-notify_confirm t3X4s
function notifyConfirm(message) {
	confirmation = message.client.serverStatus[message.guild.id].notify.confirmation
	if (message.content.split(" ")[1].charAt(1) === "\u200B"){ //check for unprintable characters that someone may have pasted in.
		message.client.functions.message(`That is not the confirmation code! ***YOU HAVE COPY-PASTED THE CONFIRMATION CODE, THE REQUEST HAS FAILED.***`)
		nofifyCancel(message)
	} else if (message.content.split(" ")[1] === confirmation) {
		message.client.functions.message(`***Intent confirmed.***`);
		notifyDo(message)
	} else
		message.client.functions.message(`That is not the confirmation code! ***DO NOT COPY/PASTE!***`);
}

function notifyDeny(message) {
	message.client.functions.message(`**No! That is not happening!**`);
}

function notifyArgs(args, message) {
	let masks = [
		["RANDOM_ONLINE_ADMIN", "send a direct message to a randomly selected online non-bot user with the MANAGE_SERVER permission, picking from every single notify-enabled server.", "LOW"],
		["RANDOM_ONLINE_USER", "send a direct message to a randomly selected non-bot user, picking from every single notify-enabled server.", "LOW"],
		["ALL_ONLINE_ADMINS", "send a direct message to **every single online user with the MANAGE_SERVER permission** that is in a server controlled by notify.", "HIGH"],
		["ALL_ONLINE_ADMINS_ONMSG", "send a direct message to **every single online user with the MANAGE_SERVER permission** that is in a server controlled by notify. The messages will be sent to a user once he types something in a text channel visible to Vonodosh", "HIGH"],
		["ALL_SERVERS_GENERAL", "send a message to the default channel on every notify-enabled server.", "MED"],
		["ALL_SERVERS_GENERAL_PIN", "send and pin a message to the default channel on every notify-enabled server.", "MED"]
	]
	let selectedMask;
	//find the mask in the input
	masks.forEach(mask => {
		if(mask.lastIndexOf(args.serverMask) !== -1) //checks that the mask is in the mask array
			selectedMask = args.serverMask;
		});
	//if it's not found, deny the notify request.
	if (selectedMask !== undefined){
		message.client.serverStatus[message.guild.id].notify.confirmation = generateConfirmation();
		message.client.serverStatus[message.guild.id].notify.mask = selectedMask;
		confirmation = message.client.serverStatus[message.guild.id].notify.confirmation;
		confirmationFake = confirmation.split("").join("\u200B"); //anti copy-paste
		return [confirmationFake, masks[selectedMask]];
	} else
		notifyDeny(message);
}
