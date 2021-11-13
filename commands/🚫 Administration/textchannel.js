const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'textchannel',
    aliases: ['ch'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: 'Create and Delete Text Channels',
    usage: '[COMMAND] + <create/delete> + <name>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        let channelName = args.slice(1).join(" ");

        if (!args[0]) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle(`To Create and Delete Text Channel Follow Me`)
                    .setDescription(`> ${prefix}textchannel <create> <Name>`)
                    .addField(`> ${prefix}textchannel <delete> <#channel>`)
                    .setFooter(ee.footertext)
            )
        }

        if (args[0].toLowerCase() === "create") {
            if (!channelName) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`Please Give Channel Name`)
                        .setFooter(ee.footertext)
                )
            }
            try {
                message.guild.channels.create(channelName, {
                    topic: "For Chatting",
                    type: 'text'
                })

            } catch (e) {
                message.channel.send(
                    new MessageEmbed()
                        .setDescription(e)
                )
            }
        }

        // delete channel

        if (args[0].toLowerCase() === "delete") {
            try {
                let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
                if (!channel) return message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`Please Give Channel to Delete`)
                        .setFooter(ee.footertext)
                )

                await channel.delete()
            } catch (e) {
                message.channel.send(
                    new MessageEmbed()
                        .setDescription(e)
                )
            }
        }
    }
}