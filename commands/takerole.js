function canDeleteRole(guildMember, role){
    if(guildMember.roles)
}

module.exports = {
    docstring: `Gives the specified users a specified role.\nRequirements: you have the permission "Manage Roles", the bot has a higher role than the role you're giving, and your role is higher than the one you're giving.`,
    usage: prefix => { return `Usage:\n\`${prefix}takerole <role> | <user1> <optionalusers>\``},
    command: (message) => {
        // let role = message.content.slice(message.content.split(" ")[0].length).split("|")[0];
        // console.log(role)
        // if (canDeleteRole(message.guild[message.author]) && canDeleteRole(message.guild[message.client.user])){
        //     for (var i = 0; i < Array.from(message.mentions.users).length; i++) {
        //                         message.guild.members.get(Array.from(message.mentions.users)[i][1].id).addRole(Array.from(message.mentions.roles)[0][1])
        //     }
        // } else {
        //     message.client.functions.sendMessage({description:"You don't meet the requirements to use this command."})
        // }
        console.log("someone's using takerole")
    }
}
