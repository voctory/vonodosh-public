module.exports = {
	docstring: `Retrieves the color(in hexadecimal notation) of a specified role.`,
	usage: prefix => { return `Usage:\n\`${prefix}hex <role>\`` },
	command: message => {
		if (message.mentions.users.array().length != 0) {
			let user = message.guild.member(message.mentions.users.array()[0]);
			message.client.functions.message(message, `${user}'s visible hexcode is: **${user.highestRole.hexColor.toUpperCase()}**`)
		}
		else {
			let roleName = message.content.substring(message.content.split(" ")[0].length, message.content.length);
			let rolesArray = message.guild.roles.array();
			for (let i in rolesArray) {
				if (rolesArray[i].name.toLowerCase().trim() == roleName.toLowerCase().trim()) {
					let roleFound = rolesArray[i];
					message.client.functions.message(message, `The hexcode for the role **'${roleFound.name}'** is **${roleFound.hexColor.toUpperCase()}**.`)
					break;
				}
			}
		}
	}
}
