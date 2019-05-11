var giphy = require('giphy-api')();

module.exports = {
	docstring: `Giphy search. Looks for GIFs that match the supplied parameters.`,
	usage: prefix => { return `Usage:\n\`${prefix}giphy <search> <optionalsearches>\`` },
    command: function(message) {
        giphy.search(message.content.substr(message.content.split(" ")[0].length, message.content.length).trim(), function(err, res) {
            if (err) { message.client.functions.message(message, "There was an error in retrieving your GIF!"); return }
            else if (res.data[0] == undefined) { message.client.functions.message(message, "There was an error in retrieving your GIF!"); return }
            else message.client.functions.message(message, `**Here's the GIF we found :film_frames:** | ${res.data[0].bitly_url}`)
        })
    }
}
