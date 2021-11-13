const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'hackban',
    aliases: ['bns'],
    category: '🚫 Administration',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: 'Ban a User Outside of Guild',
    usage: '[COMMAND]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if (!user) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Please Give a User ID **\`${prefix}hackban <@userid> <reason>\`**`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        if (isNaN(user)) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Please Give a User ID **User ID not alphabet only Numbers**`)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }


        if (user.id === client.user.id) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\` Please Don't Ban me 😢😢😢 \`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        if (user.id === message.author.id) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\` You cant Ban YourSelf 😂😁😁 \`\``)
                    .setFooter(ee.footertext)
            ).then(msg => msg.delete({ timeout: 5000 }))
        }

        const reason = args.slice(1).join(" ");

        try {
            if (user) {
                client.users.fetch(user).then(async (member) => {
                    await message.guild.members.ban(member.id, { reason: reason })
                    user.send(
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`You Hack Banned From ${message.guild.name}`)
                            .addField(`> Reason :- \`\`${reason != " " ? reason : - "-"}\`\``, true)
                            .addField(`> Banned By <@${message.author.id}>`, true)
                            .setFooter(ee.footertext)
                    )
                })

                message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`<@${user}> SuccesFully Banned From ${message.guild.name}`)
                        .addField(`> Reason :- \`\`${reason != " " ? reason : - "-"}\`\``, true)
                        .addField(`> Banned By <@${message.author.id}>`, true)
                        .setFooter(ee.footertext)
                ).then(msg => msg.delete({ timeout: 5000 }))
            }
        } catch (e) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`\`\`\`js\n ${e} \`\`\``)
                    .setFooter(ee.footertext)
            )
        }
    }
}