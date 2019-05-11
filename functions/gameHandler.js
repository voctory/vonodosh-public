const games = require('../commands/games.js')

module.exports = obj => {
  if (!obj) return;
  if (!obj.message || !obj.game) return;

  // relaying the message obj to the module
  games[obj.game.toLowerCase()].trigger(obj.message);
}
