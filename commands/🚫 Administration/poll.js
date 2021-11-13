const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'poll',
    aliases: ['pl'],
    category: '🚫 Administration',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: 'Do Poll in Server',
    usage: '[COMMAND] + [Channel] + [Question]',
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
                .setDescription(`Usage >>> ${prefix}poll <#channel> <question>`))
        if (!channel) {
            message.reply(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription("Specify A Channel To Send This Poll")
            )
            return
        } else {
            let announce = args.slice(1).join(" ")
            if (!announce) return message.channel.send(`Please Specify What Do You Want To Announce`)
            const embed =  new MessageEmbed()
 .setColor(ee.color)
                .setTitle(`🔰Poll Time 🔰`)
                .setDescription(`${announce}`)
                .setFooter("Poll started by: " + message.author.username + '#' + message.author.discriminator)
            let msgEmbed = await channel.send(embed)
            await msgEmbed.react('✅')
            await msgEmbed.react('❌')
        }
    }
}