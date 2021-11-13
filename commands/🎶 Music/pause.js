const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "pause",
  aliases: ["pu",'break'],
  category: "🎶 Music",
  permissions: " ",
  description: "Pause Playing Song",
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
          `Please Join Voice Channel To Pause Song`
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
    if (distube.isPaused(message))  return message.channel.send(
         new MessageEmbed()
                .setColor(ee.color)
        .setDescription(`Song Already Paushed....`)
    )
    distube.pause(message);

    message.channel.send(
       new MessageEmbed()
                .setColor(ee.color).setDescription(
        `Song Paushed By <@${message.author.id}>`
      )
    ).then((msg) => {
        msg.delete({timeout : 5000})
    })
  },
};
