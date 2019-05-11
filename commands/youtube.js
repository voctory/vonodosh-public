let YouTube = require('youtube-node');
let youTube = new YouTube();
let fs = require('fs');

youTube.setKey(JSON.parse(fs.readFileSync('./info/keys.json')).youtube);

module.exports = {
    docstring: `Youtube search module, returns a video that best matches what you told it to search for.`,
    usage: prefix => {return `Usage:\n\`${prefix}youtube <search>\``},
    command: function(message) {
      if (message.content.substring(message.content.split(" ")[0].length, message.content.length).trim() == "") {
        message.client.functions.message(message, `You didn't input a name! \`${message.client.serverStatus[message.guild.id].prefix}youtube (video name)\``);
        return;
      }
        youTube.search(message.content.substring(message.content.split(" ")[0].length, message.content.length), 1, function(err, result) {
            if (!err && result && result.items[0] != undefined) {
              if (result.items[0].id.videoId != undefined) {
                message.client.functions.message(message, `**Here's your video :video_camera:** | https://youtu.be/${result.items[0].id.videoId}`)
              }
              else { message.client.functions.message(message, {
                description: "I couldn't find the video you were searching for.",
                color: message.client.functions.embed("color"),
          			footer: message.client.functions.embed("footer", message) })
              }
            }
            else { message.client.functions.message(message, {
              description: "I couldn't find the video you were searching for.",
              color: message.client.functions.embed("color"),
        			footer: message.client.functions.embed("footer", message) })
            }
        })
    },
  nonembed: message => {
		 youTube.search(message.content.substring(message.content.split(" ")[0].length, message.content.length), 1, function(err, result) {
			if (!err && result && result.items[0] != undefined){
				message.client.functions.message(message, `**Here's your video :video_camera:** | https://youtu.be/${result.items[0].id.videoId}`);
			}
      else {
				message.client.functions.message(message, "I couldn't find the video you were searching for.");
			}
		 });
	}
}
