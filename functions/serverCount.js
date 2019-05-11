let fs = require('fs');

module.exports = client => {
  countRetrieve(client, function(totalServerCount) {
    client.user.setGame(`${fs.readFileSync('./info/prefix.txt')}help // ${totalServerCount} servers`)
    client.functions.guildUpdate(totalServerCount)
  });
}

function countRetrieve(client, callback) {
  client.shard.fetchClientValues('guilds.size').then(results => {
    console.log(`${results.reduce((prev, val) => prev + val, 0)} total guilds`);
    callback(results.reduce((prev, val) => prev + val, 0));
  });
}
