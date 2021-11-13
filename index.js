const Discord = require("discord.js");
const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const colors = require("colors");
const fs = require("fs");
const emojis = require("./config/emojis.json")
const config = require("./config/config.json")
// require('canvas').registerFont("Genta.ttf", {
//   family: "Genta"
// }); //loading a font

// client define
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  disableEveryone: true,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  presence : {
    status : "dnd",
  }
});
module.exports = client;

const mongoose = require("mongoose");
mongoose
  .connect(config.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(console.log(
    `
    ..............................................................................
    ........................ Mongo DB Connected ..................................
    ..............................................................................
    `
  ));


client.setMaxListeners(50);
require('events').defaultMaxListeners = 50;

// //Loading discord-buttons
const dbs = require('discord-buttons');
dbs(client);


// Global Variables
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.category = fs.readdirSync("./commands/");
client.db = require('quick.db')


function requirehandlers() {
  client.basicshandlers = Array(
    "command", "events", "distube"
  );
  client.basicshandlers.forEach(handler => {
    try { require(`./handlers/${handler}`)(client); } catch (e) { console.log(e) }
  });
} requirehandlers();


client.login(config.token);

module.exports.requirehandlers = requirehandlers;