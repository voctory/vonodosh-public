let cli = require('cli').enable('version', 'status'),
    fs = require('fs'),
    childprocess = require('child_process');
//  An awful lot of trouble... for the smallest thing. Oh well, time well spent.
cli.setApp(__filename.slice(__filename.search("[^\/]+\.js")), '0.0.1');

sentArgs = cli.parse({
    keysfile:['k', 'A file that contains all the API keys necessary for the bot to function.', 'file', __dirname+'/info/keys.json'],
    botfile:['b', 'The file from which the bot should start.', 'file', __dirname+'/main.js']
});


if(fs.existsSync(sentArgs.botfile) && fs.existsSync(sentArgs.keysfile)){
    cli.debug("Success!");
    cli.info(`Running ${sentArgs.botfile}...`);
    childprocess.fork(sentArgs.botfile, [`--keysfile=${sentArgs.keysfile}`], {stdio: [0, 1, 2, 'ipc']})
} else {
    cli.error("One of your filepaths was invalid!")
}
