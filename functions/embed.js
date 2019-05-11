const priorityNumber = 20;

// always make priorities add up to priorityNumber
const footerResponses = [
	{ priority: 12, text: `Enjoy using our bot? Consider supporting the developers: patreon.com/vonodosh` },
	{ priority: 5, text: `Vonodosh Invite Link: bit.ly/vonodoshoauth // Patreon: patreon.com/vonodosh` },
	{ priority: 2, text: `Did you know we have a server? Neither did we. Jokes. Invite Link: discord.me/vonodosh` },
	{ priority: 1, text: `Have you seen our Twitter Account? Check it out: @VonodoshBot` }
];

module.exports = (name, message) => {
	if (name == "color")
		return Math.floor(Math.random() * 16777440) + 1;
	else if (name == "footer") return {
		text: footerSelector(),
		icon_url: message.client.user.avatarURL
	};
};

function footerSelector() {
	let currentPriority = 0;
	let responseChances = {};

	// automate sorting out chances with some loops
	for (let i = 0; i < footerResponses.length; i++) {

		// for everyone incrementation in the priority number, add to responseChances
		for (let x = 0; x < footerResponses[i].priority; x++) {
			responseChances[currentPriority.toString()] = {};
			responseChances[currentPriority.toString()].text = footerResponses[i].text;
			currentPriority++;
		}
	}

	// returning the text of the footer
	return responseChances[Math.floor(Math.random() * priorityNumber)].text
};
