const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const ms = require("ms");

module.exports = {
    name: 'g-end',
    aliases: ['end', 'giveway-end'],
    category: '🎁 Giveaway',
    memberpermissions: ["MANAGE_CHANNELS"],
    cooldown: 5,
    description: 'End a Giveway in Server',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        if (!args.length) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`> \`\` Usage :- ${prefix}g-end <g-ID> \`\` `)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 50000 }))
        }

        let g_ID = args[0];

        if (!g_ID) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`> Please Provide a Giveway ID`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 50000 }))
        }

        let giveaway =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageID === g_ID);

        if (!giveaway) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`> Giveway Not Found For ${g_ID}`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 50000 }))
        }


        // Edit the giveaway
        client.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
            // Success message
            .then(() => {
                // Success message
                message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription('> Giveaway will end in less than ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' seconds...')
                        .setFooter(ee.footertext)
                ).then(msg => msg.delete({ timeout: 50000 }))
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)) {
                    message.channel.send(
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription('> Giveaway Is Already Ended')
                            .setFooter(ee.footertext)
                    ).then(msg => msg.delete({ timeout: 50000 }))
                } else {
                    message.channel.send(
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(e)
                            .setFooter(ee.footertext)
                    ).then(msg => msg.delete({ timeout: 50000 }))
                }
            });
    }
}