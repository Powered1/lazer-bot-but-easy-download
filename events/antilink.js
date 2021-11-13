const ms = require('ms')
const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('../index')
const antilinkdata = require('../utils/models/antilink');

/** 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */

client.on('message', (message) => {
    try {
        const messagedelete = () => {
            message.delete();
            message.reply(
                new MessageEmbed()
                    .setDescription(`\`\` Noob Don't Send Any Type Of Link Here Bcz I am The Anti-Link Bot 😁😁 \`\``)
            ).then((msg) => {
                msg.delete({ timeout: 5000 })
            })
        }
        antilinkdata.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (
                message.content.match("https://") ||
                message.content.match("discord.gg") ||
                message.content.match("www.")
            ) {
                messagedelete()
            }
        })
    } catch (e) {
        message.channel.send(e)
    }
})