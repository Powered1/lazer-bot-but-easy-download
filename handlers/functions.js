const Discord = require("discord.js");
const emoji = require("../config/emojis.json");
const config = require("../config/config.json");
const ee = require("../config/embed.json");


module.exports.escapeRegex = escapeRegex;

function escapeRegex(str) {
  try {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}


