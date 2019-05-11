var answers = ["I am glad to inform you that it is certain.", "I am 100% sure that it is decidedly so.", "there are no doubts my friend, that you are correct.", "the answer to your question is yes. Definitely. Totally.", "you may rely on it, take it from me personally.", "as I can see it, yes. For sure.", "it would only seem most likely that it's correct. Although you never heard that from me.", "the outlook seems good.", "yep. Easy as that.", "all the signs point to yes.", "reply hazy, try again. ZZZ.", "can you ask again later?", "my sources tell me that it's best not to tell you now.", "sadly, I cannot predict that at the moment.", "concentrate and ask again, you seem a little bit confused.", "oh boy, don't count on it.", "the answer I got back was no.", "sources tell me it's a no. How unfortunate.", "the outlook isn't looking too swell.", "I'm very skeptical about that turning out to be true."]

module.exports = {
	docstring: `Ask the magic 8-ball a question, and it may tell you with absolute certainty the answer.`,
	usage: prefix => { return `Usage:\n\`${prefix}eightball <question>\``},
    command: function(message) {
        message.client.functions.message(message, {
          title: "The Eight-Ball Inquiry",
          description: "Trust me, I know all the answers.",
          color: message.client.functions.embed("color"),
          footer: message.client.functions.embed("footer", message),
          thumbnail: { url: "https://i.imgur.com/a6IIqQU.png" },
          fields: [
            {name: "Question:", value: `:question: - *${message.content.substr(message.content.split(" ")[0].length, message.content.length).trim()}*`, inline: false},
            {name: "Answer from the one and only:", value: `:8ball: - **${message.author.username}, ${answers[Math.floor(Math.random() * answers.length)]}**`, inline: false}
          ]
        })
    }
}
