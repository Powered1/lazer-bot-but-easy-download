const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'deleteallmessages',
    aliases: ['delmsg'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: 'Delete all Messages in a Channel',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        if (!args.length) {
             new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`Usage >>> ${prefix}deleteallmessages <#channel>`)
        }
        let channel = message.mentions.channels.first();
        if (!channel) {
            message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription(`Please Specify a Channel to Delete Messages`)
            )
        } else {
            const position = channel.position;
            const topic = channel.topic;
            const channel2 = await channel.clone()
            channel2.setPosition(position);
            channel2.setTopic(topic);
            channel.delete();
            const nuke =  new MessageEmbed()
 .setColor(ee.color)
                .setColor("BLUE")
                .setDescription(" 🤣😂 **Channel Messages Has Been Deleted!**");
            return message.author.send(nuke)
        }


    }
}