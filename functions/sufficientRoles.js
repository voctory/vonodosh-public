module.exports = (message, user) => {
  if (message.guild.member(user).roles.find(r => r.name.toLowerCase().trim() == "vonodosh")) return true;
  else if (message.guild.member(user).roles.find(r => r.name.toLowerCase().trim() == "bot commander")) return true;
  else if (message.guild.member(user).hasPermission("ADMINISTRATOR")) return true;
  else return false;
}
