const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const ms = require('ms')

module.exports = {
    name: 'timelock',
    aliases: ['pl'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: "Start a timed lockdown in a channel",
    usage: "timelock <time>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        const time = args.join(" ");
        if (!time) {
            return message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription("Enter a valid time period in `Seconds`, `Minutes` or `Hours`")
            );
        }
        message.channel.overwritePermissions([
            {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
            }
        ]);
        const embed =  new MessageEmbed()
 .setColor(ee.color)
            .setTitle("Channel Updates")
            .setDescription(
                `${message.channel} has been placed under lockdown for \`${time}\``
            )
        message.channel.send(embed);

        setTimeout(function () {
            message.channel.overwritePermissions([
                {
                    id: message.guild.id,
                    null: ["SEND_MESSAGES"]
                }
            ]);
            const embed2 =  new MessageEmbed()
 .setColor(ee.color)
                .setTitle("Channel Updates")
                .setDescription(`Locked has been lifted in ${message.channel}`)
            message.channel.send(embed2);
        }, ms(time));
    }
}