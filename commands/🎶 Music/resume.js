const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "resume",
  aliases: ["r",'rsu'],
  category: "🎶 Music",
  permissions: " ",
  description: "Resume Paushed Song",
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
      return message.channel.send(
         new MessageEmbed()
                .setColor(ee.color).setDescription(
          `Please Join Voice Channel To Resume Song`
        )
      ).then((msg) => {
        msg.delete({timeout : 5000})
    })

    //If Bot not connected, return error
    if (!message.guild.me.voice.channel)
      return message.channel.send(
         new MessageEmbed()
                .setColor(ee.color).setDescription(`Nothing Playing In Voice Channel`)
      ).then((msg) => {
        msg.delete({timeout : 5000})
    })

    //if they are not in the same channel, return error only check if connected
    if (
      message.guild.me.voice.channel &&
      channel.id != message.guild.me.voice.channel.id
    )
      return message.channel.send(
         new MessageEmbed()
                .setColor(ee.color).setDescription(
          `Please Join My Voice Channel ${message.guild.me.voice.channel.name}`
        )
      ).then((msg) => {
        msg.delete({timeout : 5000})
    })

    // if already paushed
    if (distube.isPlaying(message))  return message.channel.send(
         new MessageEmbed()
                .setColor(ee.color)
        .setDescription(`Song Already Resumed....`)
    )
    distube.resume(message);

    message.channel.send(
       new MessageEmbed()
                .setColor(ee.color).setDescription(
        `Song Resumed By <@${message.author.id}>`
      )
    ).then((msg) => {
        msg.delete({timeout : 5000})
    })
  },
};
