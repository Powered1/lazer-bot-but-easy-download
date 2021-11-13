const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'massban',
    aliases: ['bhagja'],
    category: '🚫 Administration',
    memberpermissions: ['BAN_MEMBERS'],
    cooldown: 5,
    description: 'Ban Multiple Users at Same time',
    usage: 'massban + <@users> + <reason>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        let member = message.mentions.members || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).slice(member.size).join(" ")

        // if not a member
        if (!member) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle(`**Please Mention a User to Ban**`)
                    .setDescription(`> Usage =  ${prefix}ban + <@user> + <reason>`)
                    .setFooter(ee.footertext)
            )
        }

        // if member role not high
        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`** Your Role is Not High To Ban this User`)
                    .setFooter(ee.footertext)
            )
        }

        // if not a Reason
        if (!reason) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`**Please Give Reason **`)
                    .setFooter(ee.footertext)
            )
        }

        if (member.bannable) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`** Cannot Ban This User **`)
            )
        }


        member.forEach((bans) => {
            message.guild.members.ban(bans, {
                reason: reason,
                days: 7
            })
        })
        message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`All Mentioned Users ✅ Successful Banned ${member.map(m => `**<@${m.user.id}>**`).join(", ")} | ${reason}`)
                .setFooter(ee.footertext)
        )

    }
}