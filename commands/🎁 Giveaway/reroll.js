const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const ms = require("ms");

module.exports = {
    name: 'g-reroll',
    aliases: ['roll', 'giveway-reroll'],
    category: '🎁 Giveaway',
    memberpermissions: ["MANAGE_CHANNELS"],
    cooldown: 5,
    description: 'Re Roll a Giveway in Server',
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
                    .setDescription(`> \`\` Usage :- ${prefix}g-reroll <g-ID> \`\` `)
                    .setFooter(ee.giveway)
            ).then(msg => msg.delete({ timeout: 50000 }))
        }

        let g_ID = args[0];

        if (!g_ID) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`> Please Provide a Giveway ID`)
                    .setFooter(ee.giveway)
            ).then(msg => msg.delete({ timeout: 50000 }))
        }

        // try to found the giveaway with prize then with ID
        let giveaway =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        // If no giveaway was found
        if (!giveaway) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`No Giveaway Found`)
                    .setFooter(ee.giveway)
            ).then(msg => msg.delete({timeout : 50000}))
        }

        // Reroll the giveaway
        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                // Success message
                message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`🎁 Giveaway ✅ SuccessFully Rerolled`)
                        .setFooter(ee.giveway)
                ).then(msg => msg.delete({timeout : 50000}))
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)) {
                    message.channel.send(
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`🎁 Giveaway is Not Ended!`)
                            .setFooter(ee.giveway)
                    ).then(msg => msg.delete({timeout : 50000}))
                } else {
                    message.channel.send(
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(e)
                            .setFooter(ee.giveway)
                    ).then(msg => msg.delete({timeout : 50000}))
                }
            });

    }
}