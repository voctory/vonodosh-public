module.exports = {
	docstring: "Request support, or any misc. help in the bot. Opens a link to the Vonodosh #support channel.",
	usage: prefix => { return `Usage:\n\`${prefix}support\` to view the support channel's invite link.`},
	command: message => {
		message.client.functions.message(message.author, "Input the following invite code to join the #support channel: **M9xbkzM**")
		}
}
