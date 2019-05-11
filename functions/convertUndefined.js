module.exports = obj => {
  if (obj != undefined && obj != null && obj != "") return obj;
  else return "Could not retrieve.";
}
