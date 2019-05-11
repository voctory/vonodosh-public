var fs = require('fs');

module.exports = {
	docstring: `Gives the specified users a specified role.\nRequirements: you have the permission "Manage Roles", the bot has a higher role than the role you're giving, and your role is higher than the one you're giving.`,
	usage: prefix => { return `Usage:\n\`${prefix}giverole <role> | <user1> <optionalusers>\``},
    command: function(message) {
        if (message.content.toLowerCase().includes("to") || message.content.toLowerCase().includes("|")) {

            var splitChar;
            if (message.content.toLowerCase().includes("to")) splitChar = "to"
            else if (message.content.toLowerCase().includes("|")) splitChar = "|"

            if (message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
                if (Array.from(message.mentions.roles).length != 0) {
                    if (Array.from(message.mentions.roles)[0][1].position < message.member.highestRole.position || message.author.id == message.guild.ownerID) {
                        if (Array.from(message.mentions.roles)[0][1].position < message.guild.members.get(message.client.user.id).highestRole.position) {
                            for (var i = 0; i < Array.from(message.mentions.users).length; i++) {
                                message.guild.members.get(Array.from(message.mentions.users)[i][1].id).addRole(Array.from(message.mentions.roles)[0][1])
                            }
                            message.client.functions.message(message, `I have attempted to hand out the **${Array.from(message.mentions.roles)[0][1].name}** role to all the users you've mentioned.`)
                        }
                        else message.client.functions.message(message, "My highest role is positioned below or is equal to the role you're trying to give!")
                    }
                    else message.client.functions.message(message, "Your highest role's rank on the role-list is lower or is equal to the role rank of the role you're trying to give!\nEither that, or I have insufficient permissions.")
                }
                else if (message.guild.roles.find(val => val.name.toLowerCase().trim() == message.content.toLowerCase().slice(message.content.split(" ")[0].length, message.content.toLowerCase().lastIndexOf(splitChar)).toLowerCase().trim())) {
                    if (message.guild.roles.find(val => val.name.toLowerCase() == message.content.slice(message.content.split(" ")[0].length, message.content.toLowerCase().lastIndexOf(splitChar)).toLowerCase().trim()).position < message.member.highestRole.position || message.author.id == message.guild.ownerID) {
                        if (message.guild.roles.find(val => val.name.toLowerCase().trim() == message.content.slice(message.content.split(" ")[0].length, message.content.toLowerCase().lastIndexOf(splitChar)).toLowerCase().trim()).position < message.guild.members.get(message.client.user.id).highestRole.position) {
                            for (var i = 0; i < Array.from(message.mentions.users).length; i++) {
                                message.guild.members.get(Array.from(message.mentions.users)[i][1].id).addRole(message.guild.roles.find(val => val.name.toLowerCase().trim() == message.content.slice(message.content.split(" ")[0].length, message.content.toLowerCase().lastIndexOf(splitChar)).toLowerCase().trim()))
                            }
                            message.client.functions.message(message, `I have attempted to hand out the **${message.guild.roles.find(val => val.name.toLowerCase().trim() == message.content.slice(message.content.split(" ")[0].length, message.content.toLowerCase().lastIndexOf(splitChar)).toLowerCase().trim()).name}** role to all the users you've mentioned.`)
                        }
                        else message.client.functions.message(message, "My highest role is positioned below or is equal the role you're trying to give!")
                    }
                    else message.client.functions.message(message, "Your highest role's rank on the role-list is lower or is equal to the role rank of the role you're trying to give!\nEither that, or I have insufficient permissions.")
                }
                else { message.client.functions.message(message, "You did not mention a valid role!"); console.log( message.content.substr(message.content.split(" ")[0].length, message.content.lastIndexOf(splitChar)).toLowerCase().trim() ) }
            }
            else message.client.functions.message(message, "You do not have permission to Manage Roles!");
        }
        else message.client.functions.message(message, module.exports.usage)
    }
};
