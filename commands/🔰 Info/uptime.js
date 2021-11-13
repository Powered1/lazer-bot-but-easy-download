const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config/config.json");
const ee = require('../../config/embed.json')
module.exports = {
    name: 'uptime',
    category: "🔰 Info",
    aliases: ['uptime'],
    cooldown: 5,
    description: 'Get Bot Uptime..',
    usage: 'uptime',
    memberpermissions: [" "],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        const days = Math.floor(client.uptime / 86400000);
        const hours = Math.floor(client.uptime / 3600000) % 24; // 1 Day = 24 Hours
        const minutes = Math.floor(client.uptime / 60000) % 60; // 1 Hour = 60 Minutes
        const seconds = Math.floor(client.uptime / 1000) % 60; // 1 Minute = 60 Seconds

        message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setTitle(`\`\` ${client.user.username} Uptime Info \`\``)
                .setThumbnail(client.user.displayAvatarURL({dynamic : true}))
                .setDescription(` \`\`**Uptime**: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds \`\``)
        )
    }
}