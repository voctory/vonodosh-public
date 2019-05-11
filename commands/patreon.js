module.exports = {
  docstring: "The Patreon command. Returns a link to Vonodosh's Patreon.",
  usage: prefix => { return `Usage:\n\`${prefix}patreon\`` },
  command: message => {
    message.client.functions.message(message.author, `**Our Patreon: https://patreon.com/vonodosh**\nIf you enjoy using the bot, consider donating to the team. It's all optional, but it pushes us to do even more. We have a few reward tiers, if you do consider donating.`)
  }
}
