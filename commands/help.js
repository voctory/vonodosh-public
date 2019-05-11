module.exports = {
	command: (message) => {
		let messagearray = message.content.split(" ");
		let command = require('./commands.js')[message.content.split(" ")[1]];
		if (messagearray[1] === undefined) {
			require('./clist.js').command(message)
		}
		else if (Object.keys(require('./commands.js')).includes(messagearray[1])){
			if (command.docstring === undefined)
				message.client.functions.message(message, {
				description:":warning: There is no documentation for this command! Apply caution... :warning:",
				color: parseInt("FFCC4D", 16)
			});
			else {
				if(command.usage === undefined)
				message.client.functions.message(message, {
					description: command.docstring,
					color: message.client.functions.embed("color")
				});
				else
					message.client.functions.message(message, {
						description: command.docstring + '\n\n' + command.usage(message.client.functions.prefixManager(message)),
						color: message.client.functions.embed("color")
					});
			}
		}
		else {
			message.client.functions.message(message, {
				description:":warning: :octagonal_sign: That's not something I can tell you about. :octagonal_sign: :warning:",
				color: parseInt("DD2E44", 16)
			});
		}
	},
	docstring: "It's the help command. Roll initiative?",
	usage: prefix => { return `Use \`${prefix}help <command name>\` to find out more about a specific command. Use \`${prefix}commandlist\` or \`${prefix}clist\` to view all available commands.`}
}
