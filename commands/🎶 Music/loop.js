const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "loop",
  aliases: ["s"],
  category: "🎶 Music",
  permissions: " ",
  description: "lopp Playing Song",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    const { channel } = message.member.voice;

    //if member not connected return error
    if (!channel)
      return message.channel
        .send(
           new MessageEmbed()
                .setColor(ee.color).setDescription(
            `Please Join Voice Channel To Loop Song`
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    //If Bot not connected, return error
    if (!message.guild.me.voice.channel)
      return message.channel
        .send(
           new MessageEmbed()
                .setColor(ee.color).setDescription(
            `Nothing Playing In Voice Channel To Loop`
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    //if they are not in the same channel, return error only check if connected
    if (
      message.guild.me.voice.channel &&
      channel.id != message.guild.me.voice.channel.id
    )
      return message.channel
        .send(
           new MessageEmbed()
                .setColor(ee.color).setDescription(
            `Please Join My Voice Channel ${message.guild.me.voice.channel.name}`
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    if (!args[0])
      return message.channel
        .send(
           new MessageEmbed()
                .setColor(ee.color).setDescription(
            " Please add the Loop style Options wanna change",
            `Valid Options:\n\n\`0\`   /   \`1\`   /   \`2\`\n\`off\` / \`song\` / \`queue\``
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    //set variable
    let loopis = args[0];
    if (args[0].toString().toLowerCase() === "song") loopis = "1";
    else if (args[0].toString().toLowerCase() === "queue") loopis = "2";
    else if (args[0].toString().toLowerCase() === "off") loopis = "0";
    else if (args[0].toString().toLowerCase() === "s") loopis = "1";
    else if (args[0].toString().toLowerCase() === "q") loopis = "2";
    else if (args[0].toString().toLowerCase() === "disable") loopis = "0";
    loopis = Number(loopis);

    if (0 <= loopis && loopis <= 2) {
      await distube.setRepeatMode(message, parseInt(args[0]));
      message.channel
        .send(
           new MessageEmbed()
                .setColor(ee.color).setDescription(
            "Repeat mode set to:",
            `${args[0]
              .replace("0", "OFF")
              .replace("1", "Repeat song")
              .replace("2", "Repeat Queue")}`
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    } else {
      message.channel
        .send(
           new MessageEmbed()
                .setColor(ee.color).setDescription(
            `Please use a number between **0** and **2**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`
          )
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    }
    message.channel
      .send(
         new MessageEmbed()
                .setColor(ee.color).setDescription(
          `Song Looped By <@${message.author.id}>`
        )
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  },
};
