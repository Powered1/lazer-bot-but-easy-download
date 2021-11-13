const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'dmall',
    aliases: ['pl'],
    category: '🚫 Administration',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: 'Send DM to all Guild Members',
    usage: '[COMMAND] + [text]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        if (message.author.id !== message.guild.owner.id) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\` Only Guild Owner Can use This Command \`\``)
                    .setFooter(ee.footertext)
            )
        } else {
            let dmtext = args.slice(1).join(" ");

            message.guild.members.cache.forEach(user => {
                user.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle(`Message From ${message.author.username}`)
                        .setDescription(`** ${dmtext} **`)
                        .setFooter(ee.footertext)
                ).catch(err => console.log(err))
            })
            message.channel.send(`Done`).then(msg => msg.delete({ timeout: 5000 }))
        }
    }
}