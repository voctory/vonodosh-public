module.exports = {
  command: (message) => {
    if (message.content.split(" ")[1] != undefined) {
      if (message.content.split(" ")[1].toLowerCase() == "global") {

        var commands = Object.keys(require('./globalcommands.js')).sort(function(a, b){
          var nameA=a.toLowerCase(), nameB=b.toLowerCase();
          if (nameA < nameB) //sort string ascending
            return -1;
          if (nameA > nameB)
            return 1;
          return 0; //default return value (no sorting)
        }).join('\n');

        message.client.functions.message(message.author, {
          description:`All of Vonodosh's Global commands:\`\`\`${commands}\`\`\``,
          color: message.client.functions.embed("color"),
          footer: message.client.functions.embed("footer", message)
        });
      }
    }
    else {
      var commands = Object.keys(require('./commands.js')).sort(function(a, b){
        var nameA=a.toLowerCase(), nameB=b.toLowerCase();
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB)
          return 1;
        return 0; //default return value (no sorting)
      }).join('\n');

      message.client.functions.message(message.author, {
        description:`All of Vonodosh's commands:\`\`\`${commands}\`\`\``,
        color: message.client.functions.embed("color"),
        footer: message.client.functions.embed("footer", message)
      });
    }
  },
  docstring: "Displays a list of all commands. Slightly spammy. \n*Some may be unavailable unless you meet role or developer requirements.*"
}
