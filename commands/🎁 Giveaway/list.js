const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const ms = require("ms");

module.exports = {
    name: 'g-list',
    aliases: ['list', 'giveway-list'],
    category: '🎁 Giveaway',
    memberpermissions: ["MANAGE_CHANNELS"],
    cooldown: 5,
    description: 'Show List of Running Giveways in Server',
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
                    .setDescription(`> \`\` Usage :- ${prefix}g-list <g-ID> \`\` `)
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

        let giveaways = client.giveawaysManager.giveaways.filter(g => g.guildID === `${message.guild.id}` && !g.ended)

        if (!Array.isArray(giveaways)) return message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`No Giveway Found`)
                .setFooter(ee.giveway)
        ).then(msg => msg.delete({timeout : 50000}))

        let embed = new MessageEmbed()
            .setTitle(`\`\` Current Running Giveways \`\``)
            .setColor(ee.color)
            .setFooter(ee.giveway)
            .setTimestamp()
        await Promise.all(giveaways.map(async (x) => {
            if (x.extraData) {
                const guild = client.guilds.cache.get(x.extraData.server)
                const channel = guild.channels.cache
                    .filter((channel) => channel.type === 'text')
                    .first()
                const inv = await channel.createInvite()
                await embed.addField(`\`\`Join Requirement Giveaway:\`\``, `**Prize:** **[${x.prize}](https://discord.com/channels/${x.guildID}/${x.channelID}/${x.messageID})**\n**Requirement: [Join Now](${inv})**\n**Started At: \`${new Date(x.startAt)}\`**\n**Ends At:** \`${new Date(x.endAt)}\`\n**Hosted By:** ${x.hostedBy}`)
            } else {
                embed.addField(`Normal Giveaway:`, `**Prize:** **[${x.prize}](https://discord.com/channels/${x.guildID}/${x.channelID}/${x.messageID})\nStarted At: \`${new Date(x.startAt)}\`**\n**Ends At:** \`${new Date(x.endAt)}\`\n**Hosted By:** ${x.hostedBy}`)
            }
        }));
        message.channel.send(embed).then(msg => msg.delete({timeout : 50000}))

    }
}