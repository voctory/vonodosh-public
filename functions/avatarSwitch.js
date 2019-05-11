// function that manages daily avatar switching

const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const fs = require('fs');
let previousDay;

module.exports = user => {
  if (JSON.parse(fs.readFileSync('./config.json')).avatarSwitch != true) return;

  let currentDay = new Date().getUTCDay();
  if (previousDay == currentDay) return;
  previousDay = currentDay;

  let fileName = './info/currentImage.txt';
  if (fs.readFileSync(fileName) == days[currentDay]) return;

  user.setAvatar(`./imgs/avatar_${days[currentDay]}.png`)
    .then(user => {
      console.log(`New avatar set to (../imgs/avatar_${days[currentDay]}.png)`);
      fs.writeFileSync(fileName, days[currentDay]);
    })
    .catch(console.error);
}
