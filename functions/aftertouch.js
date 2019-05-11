/*  aftertouch.js
 *  or, "Post-Message Functions"
 *  These run after a message is sent by the bot. Fun!*/
module.exports = (message) => {
    let quips = ["brought to you by aftertouch(tm)","edited with love","stank power","vonodosh rules","excelsior!","nokko is the best","nokko is the best"];
    let generatemessage = (newfooter) => {
    	return {embed:{description:message.content, footer:newfooter}}
    };

    if (message.content.split('|')[0] !== '<<><'){
        if (message.embeds.length > 1){
            message.edit(message.content.slice(5));
        }
    }
};
