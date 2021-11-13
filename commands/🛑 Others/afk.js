const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const { afk } = require("../../utils/tools/afk")


module.exports = {
    name: 'afk',
    aliases: [''],
    category: '🛑 Others',
    memberpermissions: ["SEND_MESSAGES"],
    cooldown: '',
    description: 'Put User in AFK',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        const reason = args.join(" ") || 'No reason!';

        afk.set(message.author.id, [Date.now(), reason]);

        message.channel.send(
            new MessageEmbed()
                .setDescription(`You have been set as AFK. \`${reason}\``)
                .setTimestamp()
                .setColor(ee.color)
                .setFooter(ee.footertext)
        )
    }
}