module.exports = {
	docstring: `Searches the last 100 messages and deletes any that were created by bots.`,
	usage: prefix => { return `Usage:\n\`${prefix}botclean\``},
	command: message => {
		if(hasBotCom(message.guild.members.get(message.author.id)) || hasManageMessages(message.guild.members.get(message.author.id)))
		{
			message.channel.fetchMessages({limit: 100})
				.then(msgs => {
					message.channel.bulkDelete(msgs.filter(m => m.author.bot == true))
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
		else
			message.client.functions.message(message, `${message.author}, you need either the manage messages permission or a role called \`Bot Commander\``)
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
