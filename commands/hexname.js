let namer = require('color-namer');

module.exports = {
  docstring: `Returns a name for the hexcode you provide it. Hexcode must be 7 characters long, including the hexcode.`,
	usage: prefix => { return `Usage:\n\`${prefix}hexname (#hexcode)\``},
  command: message => {
    let isOk  = /^#[0-9A-F]{6}$/i.test(message.content.split(" ")[1])
    if (isOk == true) {
      let name = namer(message.content.split(" ")[1])
      message.client.functions.message(message, `Here is the color name for the \`${message.content.split(" ")[1].toUpperCase()}\` hexcode: **${name.ntc[0].name}**`)
    }
    else {
      message.client.functions.message(message, `You didn't use the command properly!\n\`${message.content.split(" ")[0]} (#hexcode)\``)
    }
  }
}
