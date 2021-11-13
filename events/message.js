
const config = require("../config/config.json"); //loading config file with token and prefix, and settings
const ee = require("../config/embed.json"); //Loading all embed settings like color footertext and icon ...
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require(`../config/emojis.json`);
const { databasing, escapeRegex, delay } = require("../handlers/functions"); //Loading all needed functions

const client = require("..");

/** 
  * @param {Client} client 
  * @param {Message} message 
  * @param {String[]} args 
  */

//here the event starts
client.on('message', async (message) => {
  try {
    //if the message is not in a guild (aka in dms), return aka ignore the inputs
    if (!message.guild || !message.channel) return;
    //if the channel is on partial fetch it
    if (message.channel.partial) await message.channel.fetch();
    //if the message is on partial fetch it
    if (message.partial) await message.fetch();

    if (message.author.bot) return;
    //get the current prefix from the database
    let prefix = config.prefix
    //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    //if its not that then return
    if (!prefixRegex.test(message.content)) return;
    //now define the right prefix either ping or not ping
    const [, matchedPrefix] = message.content.match(prefixRegex);
    //create the arguments with sliceing of of the rightprefix length
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    //creating the cmd argument by shifting the args by 1
    const cmd = args.shift().toLowerCase();
    //if no cmd added return error
    if (cmd.length === 0) {
      if (matchedPrefix.includes(client.user.id))
        return message.reply(new Discord.MessageEmbed()
          .setDescription(`<@${message.author.id}>To see all Commands type: \`${config.prefix}help\``)
        );
      return;
    }
    //get the command from the collection
    let command = client.commands.get(cmd);
    //if the command does not exist, try to get it by his alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    //if the command is now valid
    if (command) {
      //run the command with the parameters:  client, message, args, Cmduser, text, prefix,
      command.run(client, message, args, prefix);
    }

  } catch (e) {
    console.log(String(e.stack).red)
    return message.channel.send(new MessageEmbed()
      .setColor(ee.color)
      .setColor("RED")
      .setTitle(`😃 ERROR | An error occurred!`)
      .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
    );
  }
})
