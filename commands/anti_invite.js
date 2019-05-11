module.exports = {
    usage: (prefix) => { return `Usage:\n**${prefix}antiinvite on** to enable, **${prefix}antiinvite off** to disable. Use without any arguments to check whether anti-invite is turned on.`},
    docstring: "Anti-invite. Removes most messages that have invite links in them if enabled.",
    command: (message) => {
        let fs = require('fs')
        let path = require('path')
        let listpath = path.join(__dirname, "..", message.client.antiInvitePath)
        let list = JSON.parse(fs.readFileSync(listpath), "utf-8")
        if (message.content.split(" ")[1] === "on" && message.member.hasPermission("MANAGE_GUILD")){
                if (!list["enabled"].includes(message.guild.id)) {
                    list["enabled"].push(message.guild.id) //add guild id to list
                    fs.writeFileSync(listpath, JSON.stringify(list, null, " ")) //write to the file
                    message.client.functions.message(message, "Anti-invite enabled.")
                } else {
                    message.client.functions.message(message, "Anti-invite is already enabled on this server.")
                }
        } else if (message.content.split(" ")[1] === "off" && message.member.hasPermission("MANAGE_GUILD")){
                if (list["enabled"].includes(message.guild.id)){
                    list["enabled"].splice(list.enabled.indexOf(message.guild.id), 1) //remove guild id from list
                    fs.writeFileSync(listpath, JSON.stringify(list, null, " ")) //write to the file
                    message.client.functions.message(message, "Anti-invite disabled.")
                } else {
                    message.client.functions.message(message, "Anti-invite is already disabled on this server.")
                }
        } else if (!message.member.hasPermission("MANAGE_GUILD") && message.content.split(" ").length > 1) {
            message.client.functions.message(message, "You do not have the \"Manage Guild\" permission, which is required to alter anti-invite status.")
        } else {
                //without any arguments
            if (message.content.split(" ").length < 2){
                message.client.functions.message(message, `This server has ${list.enabled.includes(message.guild.id) ? "enabled" : "disabled"} anti-invite.`)
            } else {
                //without any valid arguments
                message.client.functions.message(message, "Sorry, that's not a valid subcommand. Try with the `on` or `off` option, or without any option.")
            }
        }
    }
}
