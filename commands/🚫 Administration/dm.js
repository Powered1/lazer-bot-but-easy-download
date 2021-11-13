const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'dm',
    aliases: ['userdm'],
    category: '🚫 Administration',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: 'DM a User Using Bot',
    usage: '[COMMAND] + [text]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        let text = args.slice(1).join(' ');
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])

        if (!user) {
            return message.reply(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`** Please Mention a User to Send Message **`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 3000 }))
        }

        if (!text) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`** Please Write  a Message to Send User **`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 3000 }))
        }

        let userembed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`A Message From ${message.author.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addField(`For More Information DM This User <@${message.author.id}> `)
            .setDescription(`${message.author.username}s Message:`, `\`\` ${text} \`\``)
            .setFooter(ee.footertext)


        user.send(userembed).catch(e => {
            if (!e) {
                return message.reply(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(e)
                        .setFooter(ee.footertext)
                ).then(msg => msg.delete({ timeout: 3000 }))
            } else {
                message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`Message SuccessFully Sent to <@${user.id}>`)
                        .setFooter(ee.footertext)
                ).then(msg => msg.delete({ timeout: 3000 }))
            }
        })
    }
}