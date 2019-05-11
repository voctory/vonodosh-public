var urban = require('urban');

module.exports = {
    docstring: `Urban Dictionary module, searches for words in the one true dictionary that match your search.`,
    usage: prefix => {return `Usage:\n\`${prefix}urban <search query>\``},
    command: function(message) {
        urban(message.content.substring(message.content.split(" ")[0].length, message.content.length)).first(function(json) {
            if (typeof json == undefined || json == undefined || json.definition == undefined) {
              message.client.functions.message(message, {
                description: "We weren't able to find a definition for what you searched up.",
                color: 16753920}
              );
              return;
            }

						message.client.functions.message(message, {
								title: `Urban Definition for '${message.content.substring(message.content.split(" ")[0].length, message.content.length).trim()}'`,
								thumbnail: {url: "https://i.imgur.com/wqdQwSK.jpg"},
								color: message.client.functions.embed("color"),
								footer: message.client.functions.embed("footer", message),
								fields: [{
										name: "Definition:",
										value: json.definition.trim().toString(),
										inline: false},
									{
										name: "Example:",
										value: message.client.functions.convertUndefined(json.example.trim().toString()),
										inline: false},
									{
										name: "Upvotes:",
										value: json.thumbs_up,
										inline: true},
									{
										name: "Downvotes:",
										value: json.thumbs_down,
										inline: true},
									{
										name: "User who created the definition:",
										value: json.author.trim(),
										inline: false}
									]
							})
				})
		},
	nonembed: (message) => {
//		Placeholder message until we get a proper unembedified version.
		message.client.functions.message(message, "Some embeds are just too damn complicated.")
	}
}

function ifUndefined(obj) { if (obj == undefined) return "Undefined."; else return obj }
