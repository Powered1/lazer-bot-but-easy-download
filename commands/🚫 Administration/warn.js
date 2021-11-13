const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'warn',
    aliases: ['warn'],
    category: '🚫 Administration',
    memberpermissions: ['MANAGE_GUILD'],
    cooldown: 5,
    description: 'Warn a User as a Punishment',
    usage: '[COMMAND] + [@user] + [reason]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        const warnmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const bot = message.mentions.users.first().bot

        // if not member
        if (!warnmember) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\` Please Mention a User to Warn \`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        // it user is bot
        if (bot) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\`You Can't Warn A Bot \`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        // if user is message author
        if (message.author.id === warnmember.id) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\`You can't Warn YourSelf\`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        // if warn guild owner
        if (warnmember.id === message.guild.owner.id) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\`You can't Warn Guild Owner\`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        // define reason
        let reason = args.slice(1).join(" ");

        if (!reason) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\`You Must Provide Reason for Warn a User\`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        // database

        let warnings = client.db.get(`warnings_${message.guild.id}_${warnmember.id}`);

        if (warnings === null) {
            client.db.set(`warnings_${message.guild.id}_${warnmember.id}`, 1);
        //    try {
        //     warnmember.send(
        //         new MessageEmbed()
        //             .setColor(ee.color)
        //             .setDescription(`\`\` You Have Been Warned in **${message.guild.name}** For **${reason}** \`\``)
        //             .setFooter(ee.footertext)
        //     )
        //    } catch (e) {
        //        console.log(`DM OFF ${warnmember.user.username}`);
        //    }
            await message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`** <@${warnmember.id}>  Has Been ✅ Warned For ${reason}`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        } else if (warnings !== null) {
            client.db.add(`warnings_${message.guild.id}_${warnmember.id}`, 1);

            warnmember.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setThumbnail(warnmember.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`\`\` You Have Been Warned in **${message.guild.name}** For **${reason}** \`\``)
                    .setFooter(ee.footertext)
            )
            await message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`** <@${warnmember.id}>  Has Been ✅ Warned For ${reason}`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

    }
}