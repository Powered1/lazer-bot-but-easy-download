const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'announce',
    aliases: ['anc'],
    category: '🚫 Administration',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: 'Do Announcment in Server',
    usage: '[COMMAND] + [Channel] + [Text]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        const channel = message.mentions.channels.first()
        if (!args.length) return message.channel.send(
             new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`Usage >>> ${prefix}announce <#channel> <text>`))
        if (!channel) {
            message.reply(
                 new MessageEmbed()
                .setColor(ee.color)
                .setDescription("Specify A Channel To Send This Announcement")
            )
            return
        } else {
            let announce = args.slice(1).join(" ")
            if (!announce) return message.channel.send(`Please Specify What Do You Want To Announce`)
            const embed =  new MessageEmbed()
 .setColor(ee.color)
                .setTitle(`🔰Announcement🔰`)
                .setDescription(`${announce}`)
                .setFooter("Sent by:" + message.author.username + '#' + message.author.discriminator)
            channel.send(embed)
        }
    }
}