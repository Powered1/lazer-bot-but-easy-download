const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const ms = require("ms");

module.exports = {
    name: 'g-start',
    aliases: ['start', 'giveway'],
    category: '🎁 Giveaway',
    memberpermissions: ["MANAGE_CHANNELS"],
    cooldown: 5,
    description: 'Start a Giveway in Server',
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
                    .setDescription(`> \`\` Usage :- ${prefix}g-start <#channel> <duration> <winners> <prize> \`\` `)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 50000 }))
        }
        let gchannel = message.mentions.channels.first();
        if (!gchannel) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Please Mention a Channel to Start Giveway`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 10000 }))
        }

        let g_duration = args[1];
        if (!g_duration) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Please Give the Valid Time Duration of Giveway`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 10000 }))
        }

        let g_winners = parseInt(args[2]);
        if (isNaN(g_winners) || parseInt(g_winners) <= 0) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Please Choose Winners Count For Giveaway`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 10000 }))
        }


        let g_prize = args.slice(3).join(" ");
        if (!g_prize) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Please Enter Prize to Start Giveway`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 10000 }))
        }

        // start a giveway

        await client.giveawaysManager.start(gchannel, {
            // The giveaway duration
            time: ms(g_duration),
            // The giveaway prize
            prize: g_prize,
            // The giveaway winner count
            winnerCount: parseInt(g_winners),
            // Who hosts this giveaway
            hostedBy: config.hostedBy ? message.author : null,
            // Messages
            messages: {
                giveaway:
                    (config.everyoneMention ? "@everyone\n\n" : "") +
                    "🎉🎉 **GIVEAWAY** 🎉🎉",
                giveawayEnded:
                    (config.everyoneMention ? "@everyone\n\n" : "") +
                    "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
                timeRemaining: "Time remaining: **{duration}**!",
                inviteToParticipate: `React with 🎉 to participate!`,
                winMessage: "Congratulations, {winners}! You won **{prize}**!",
                embedFooter: "Giveaways",
                noWinner: "Giveaway cancelled, no valid participations.",
                hostedBy: "Hosted by: {user}",
                winners: "winner(s)",
                endedAt: "Ended at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                }
            }
        });

        message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`🎁 Giveaway started in ${gchannel}!`)
                .setFooter(ee.footertext)
        ).then(msg => msg.delete({ timeout: 20000 }))
    }
}