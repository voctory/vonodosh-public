const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = name => {
  if (JSON.parse(fs.readFileSync('./config.json')).commandStatistics != true) return;

  let time = new Date();
  let obj = {
    year: time.getFullYear().toString(),
    month: (time.getMonth() + 1).toString(),
    day: time.getDate().toString(),
    cmd: name,
    currentDir: "./info/cmdstats/"
  };
  initialize(obj);
}

function initialize(obj) {
  let firstOcc = Object.keys(obj)[0];
  if (obj[firstOcc] != obj.cmd) {
    if (fs.existsSync(obj.currentDir + obj[firstOcc]) == true) {
      removeProp(obj, firstOcc);
    }
    else {
      mkdirp(obj.currentDir + obj[firstOcc], function(err) {
        if (err) console.log(`Error coming from commandStatistics.js:\n${err}`)
        else removeProp(obj, firstOcc);
      })
    }
  }
  else {
    writeToFile(obj.cmd, obj.currentDir)
  }
}

function removeProp(obj, prop) {
  obj.currentDir += `${obj[prop]}/`
  if (obj[prop] != obj.day) writeToFile(obj.cmd, obj.currentDir);
  delete obj[prop];
  initialize(obj)
}

function writeToFile(name, dir) {
  let stats = {};
  if (fs.existsSync(`${dir}stats.json`)) stats = JSON.parse(fs.readFileSync(`${dir}stats.json`));
  if (stats[name] == undefined) stats[name] = 0;
  stats[name]++;
  fs.writeFileSync(`${dir}stats.json`, JSON.stringify(stats))
}
