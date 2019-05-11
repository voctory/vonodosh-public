module.exports = {
	docstring: `Searches the latest number of messages specified and deletes them.`,
	usage: prefix => { return `Usage:\n\`${prefix}prune\` (number of messages) (a user, optional)`},
	command: message => {
		if(hasBotCom(message.guild.members.get(message.author.id)) || hasManageMessages(message.guild.members.get(message.author.id)))
		{
			if (message.content.split(" ").length == 1) {
				message.client.functions.message(message, `${message.author}, you must enter a number!`);
				return;
			}
			let messageNumber = message.content.split(" ")[1].match(/[0-9]+/)
			if (messageNumber == null) {
				message.client.functions.message(message, `${message.author}, you must enter a number!`)
				return;
			}
			if (parseInt(messageNumber[0]) <= 0 || parseInt(messageNumber[0]) > 100) {
				message.client.functions.message(message, `${message.author}, you must enter a number between 1-100!`)
				return;
			}
			message.channel.fetchMessages({limit: parseInt(messageNumber[0])})
				.then(msgs => {
					let deleteId = false;
					if (message.mentions.users.array().length != 0) { deleteId = message.mentions.users.array()[0].id}
					message.channel.bulkDelete(msgs.filter(m => determineProp(deleteId, m) == true))
						.then(l => {
							message.client.functions.message(message, "**Messages successfully deleted.**", function(msg) {
								setTimeout(function() {
									msg.delete();
								}, 5000)
							})
						})
						.catch(err => {
							message.client.functions.message(message, "**I wasn't able to delete all the messages.**", function(msg) {
								setTimeout(function() {
									msg.delete();
								}, 5000)
							})
						})
				});
		}
		else message.client.functions.message(message, `${message.author}, you need either the manage messages permission or a role called \`Bot Commander\``)
	}
}

function hasBotCom(member)
{
	var roles = Array.from(member.roles);
	for(var i = 0; i < roles.length; i++)
	{
		if(roles[i][1].name.toLowerCase() == "bot commander")
			return true;
	}
	return false;
}

function hasManageMessages (member)
{
	if(member.hasPermission("MANAGE_MESSAGES"))
		return true;
	else
		return false;
}

function determineProp(id, m) {
	if (id == false) return true;
	else if (id == m.author.id) return true;
	else return false;
}
