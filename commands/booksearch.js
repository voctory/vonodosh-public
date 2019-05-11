var books = require('google-books-search');
function getBookError(message, found=true) {
	let errortype = found === true ? `I encountered an error in trying to grab your book!` : `I encountered an error in trying to grab your book! \n (It might not exist!)`
	message.client.functions.message(message, {
					description: errortype,
					color: message.client.functions.embed("color"),
					footer: message.client.functions.embed("footer", message)});
}
module.exports = {
	docstring: `Google Books search command. Searches Google Books for a given book, and gives you some info.`,
	usage: prefix => { return `Usage:\n\`${prefix}booksearch <book>\``},
    command: function(message) {
        if (message.content.substr(message.content.split(" ")[0].length, message.content.length).trim() == "") {
			getBookError(message);
			return;
			}

        books.search(message.content.substr(message.content.split(" ")[0].length, message.content.length).trim(), function(err, results) {
            if (err || results[0] === undefined) {
				message.client.functions.message(message, {
					description: `I encountered an error in trying to grab your book!`,
					color: message.client.functions.embed("color"),
					footer: message.client.functions.embed("footer", message)});
				return;
			} else {
				if (!!results[0].averageRating && !!results[0].ratingsCount && !!results[0].pageCount && !!results[0].publishedDate && !!results[0].publisher && !!results[0].language){
					message.client.functions.message(message, {
					title: `Book search for ${results[0].title.toString()}`,
					description: `by ${results[0].authors}`,
					color: message.client.functions.embed("color"),
					footer: message.client.functions.embed("footer", message),
					thumbnail: { url: results[0].thumbnail },
					fields: [
						{name: "Average Rating:", value: ":star2:".repeat(results[0].averageRating.toString()), inline: true},
						{name: "Number of Ratings:", value: results[0].ratingsCount.toString(), inline: true},
						{name: "Page Count:", value: results[0].pageCount.toString(), inline: true},
						{name: "Language:", value: results[0].language.toString(), inline: true},
						{name: "Published Date:", value: results[0].publishedDate.toString(), inline: true},
						{name: "Publisher:", value: results[0].publisher.toString(), inline: true}
					]
					})
				} else {
					getBookError(message, false);
					return;
				}
			}
        });
    }
}
