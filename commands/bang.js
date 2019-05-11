module.exports = {
    docstring:`The bang command. Tells everyone who you've decided to bang up.`,
    usage: prefix => { return `Usage: \n\`${prefix}bang @Example#1234\``},
    command: function(message) {
        if (Array.from(message.mentions.users).length == 0) { message.client.functions.message(message, "You need to mention at least one user!"); return }
        message.client.functions.message(message, `**${message.author} decided to bang up ${Array.from(message.mentions.users)[0][1]}. How unfortunate.** :boom: :gun:`)
    }
}
