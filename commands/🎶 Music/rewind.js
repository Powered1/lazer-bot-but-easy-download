const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");

module.exports = {
  name: "rewind",
  aliases: ["rw"],
  category: "🎶 Music",
  permissions: " ",
  description: "Rewind Playing Song",
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
          `Please Join Voice Channel To Rewind Song`
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

    let queue = distube.getQueue(message);

     //get the seektime
     let seektime = queue.currentTime + Number(args[0]) * 1000;
     if (seektime >= queue.songs[0].duration * 1000) seektime = queue.songs[0].duration * 1000 - 1;

     distube.seek(message , Number(seektime))


    message.channel.send(
       new MessageEmbed()
                .setColor(ee.color).setDescription(
        `Song Rewinded to ${Number(args[0])} Seconds \n By <@${message.author.id}>`
      )
    ).then((msg) => {
        msg.delete({timeout : 5000})
    })
  },
};
