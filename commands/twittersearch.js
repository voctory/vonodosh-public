var twitter = require('twitter'),
    fs = require('fs'),
    keys = JSON.parse(fs.readFileSync('./info/keys.json')).twitter;

var twitterClient = new twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});

module.exports = {
    docstring: `Search twitter for a specified user.`,
    usage: prefix => {return `Usage\n\`${prefix}twittersearch jack\`` },
    command: function(message) {
        if (message.content.split(" ").length == 1) { message.client.functions.message(message,
          {
            description: `I didn't receive a username!\n\n\`Syntax: ${message.client.functions.prefixManager(message)}twittersearch (username)\``,
            color: message.client.functions.embed("color"),
            footer: message.client.functions.embed("footer", message)
          })
        }

        twitterClient.get('users/show', {screen_name: message.content.split(" ")[1]}, function(err, tweets, response) {
            if (!err && tweets != undefined && tweets.status != undefined) { message.client.functions.message(message, {
              title: `Twitter Information for ${tweets.name} (@${tweets.screen_name})`,
              description: `Latest tweet was at ${tweets.status.created_at}`,
              color: message.client.functions.embed("color"),
              footer: message.client.functions.embed("footer", message),
              thumbnail: { url: tweets.profile_image_url },
              fields: [
                {name: "Following:", value: message.client.functions.convertUndefined(tweets.friends_count), inline: true},
                {name: "Followers:", value: message.client.functions.convertUndefined(tweets.followers_count), inline: true},
                {name: "Tweets Sent:", value: message.client.functions.convertUndefined(tweets.statuses_count), inline: true},
                {name: "Verified?:", value: message.client.functions.convertUndefined(tweets.verified), inline: true},
                {name: "Website:", value: message.client.functions.convertUndefined(tweets.url), inline: false},
                {name: "Latest Tweet:", value: `*"${message.client.functions.convertUndefined(tweets.status.text)}"*`, inline: false}
              ]}
            )}
            else message.client.functions.message(message, {
              description: `I encountered an error in trying to grab **${message.content.split(" ")[1]}**'s Twitter information.`,
              color: message.client.functions.embed("color"),
              footer: message.client.functions.embed("footer", message)
            })
        })
    },
	nonembed: (message) => {
//		Placeholder message until we get a proper unembedified version.
		message.client.functions.message(message, "Some embeds are just too damn complicated.")
	}
}
