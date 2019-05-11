// depends on avatarSwitch to function

const fs = require('fs');

module.exports = client => {
  if (JSON.parse(fs.readFileSync('./config.json')).saveServerCount != true) return;

  let time = new Date();
  if (!JSON.parse(fs.readFileSync('./info/servercount.json'))[`${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`]) {
    let currentDate = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
    let serverCountList = JSON.parse(fs.readFileSync('./info/servercount.json'));
    countRetrieve(client, function(serverCount) {
      // can't be bothered to make another way to prevent premature server count saving
      if (serverCount < 2000) return;
      
      serverCountList[currentDate] = serverCount;
      fs.writeFileSync('./info/servercount.json', JSON.stringify(serverCountList))
    })
  }
}

function countRetrieve(client, callback) {
  client.shard.fetchClientValues('guilds.size').then(results => {
    callback(results.reduce((prev, val) => prev + val, 0));
  });
}
