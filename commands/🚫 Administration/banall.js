const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'banall',
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
        try {
            const members = message.guild.members.cache.get(message.guild.id)

            for (let i = 0; i < members; i++) {
                members.ban()

            }
        } catch (e) {
            console.log(e);
        }
    }
}