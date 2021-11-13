const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'slowmode',
    aliases: ['slm'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: 'Do Poll in Server',
    usage: '[COMMAND] + [Channel] + [Question]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {


        if (!isNaN(args[0]) || parseInt(args[0]) < 0) {
            let embed =  new MessageEmbed()
 .setColor(ee.color)
                .setDescription(`✅ Slowmode Enabled in ${message.channel} on Time ${args[0]}!`)
            message.reply(embed)
            message.channel.setRateLimitPerUser(args[0])
        } else {
            let embed2 =  new MessageEmbed()
 .setColor(ee.color)
                .setDescription(`Provided Argument is Not Number`)
            message.reply(embed2)
        }


    }
}