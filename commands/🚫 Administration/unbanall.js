const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'unbanll',
    aliases: ['unball'],
    category: '🚫 Administration',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: 'Unban all Banned Users in Guild',
    usage: '[COMMAND]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            message.guild.fetchBans(bans => {
                if (bans.size == 0) {
                    message.channel.send(
                        new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`No Banned Users`)
                            .setFooter(ee.footertext)
                    )
                } else {
                    bans.forEach(ban => {
                        message.guild.members.unban(ban.user.id);
                    });
                    message.channel.send(
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`All Banned Users ✅ Successfully Unabanned..`)
                            .addField(`🔰 Unbanned By <@${message.author.id}>`)
                            .setFooter(ee.footertext)
                    )
                }
            })
        } catch (e) {
            message.channel.send(
                new MessageEmbed()
                    .setDescription(e)
            )
        }
    }
}