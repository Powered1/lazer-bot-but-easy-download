const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'leaveserver',
    aliases: [''],
    category: ' ',
    memberpermissions: [],
    cooldown: 5,
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        if (message.author.id === config.ownerIDS) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription("**You Dont Have The Permissions To Use This Command! - [ADMINISTRATOR]**")
                    .setFooter(ee.footertext)
            ).then((msg => {
                msg.delete({ timeout: 10000 })
            }))
        }

        const guildId = args[0];

        if (!guildId) return message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription("**Please Provide an Guild ID **")
                .setFooter(ee.footertext)
        ).then((msg => {
            msg.delete({ timeout: 10000 })
        }))

        const guild = client.guilds.cache.find((g) => g.id === guildId)

        if (!guild) return message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription("** This Guild Not Found .. **")
                .setFooter(ee.footertext)
        ).then((msg => {
            msg.delete({ timeout: 10000 })
        }))
        let leaved = await guild.leave()
        if (leaved) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Successfully left guild: **${guild.name}**`)
                    .setFooter(ee.footertext)
            )
        } else {
            message.channel.send('i cant do....')
        }
    }
}