const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('../index');
const config = require('../config/config.json')
/** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */


client.on('ready', () => {
  console.log(
    `
    ..............................................................................
    ........................${client.user.username} Is Online ....................
    ..............................................................................
    `
  );
  client.user.setActivity(`${config.prefix}help || Tech Boy Gaming`)
})



