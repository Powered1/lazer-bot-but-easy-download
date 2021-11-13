const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const distube = require("../../utils/distubeClient");
const { prefix } = require("../..");

module.exports = {
    name: "playlist",
    aliases: ["s"],
    category: "🎶 Music",
    permissions: " ",
    description: "Play PlayList Songs",
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
                    .setColor(ee.color)
                    .setDescription(
                        `Please Join Voice Channel To Play PlayList Song`
                    )
            ).then((msg) => {
                msg.delete({ timeout: 5000 })
            })

        //If Bot not connected, return error
        if (message.guild.me.voice.channel)
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`I am Already Connected in Channel`)
            ).then((msg) => {
                msg.delete({ timeout: 5000 })
            })

        //if they are not in the same channel, return error only check if connected
        if (
            message.guild.me.voice.channel &&
            channel.id != message.guild.me.voice.channel.id
        )
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color).
                    setDescription(
                        `Please Join My Voice Channel ${message.guild.me.voice.channel.name}`
                    )
            ).then((msg) => {
                msg.delete({ timeout: 5000 })
            })

        await distube.playCustomPlaylist(message, {
            search: args.join(" "),
            maxsongs: -1
        })
    },
};
