const { Client, Message, MessageEmbed } = require('discord.js');
const welcomeData = require("../utils/models/welcome");
const welcomemsg = require("../utils/models/joinmsg");
const ee = require('../config/embed.json');
const client = require('..');

client.on('guildMemberAdd', async (member, message) => {
    const data = await welcomeData.findOne({
        GuildID: member.guild.id,
    });
    if (data) {
        const data2 = await welcomemsg.findOne({
            GuildID: member.guild.id,
        });
        if (data2) {
            var joinmessage = data2.JoinMsg;

            joinmessage = joinmessage.replace("{user.mention}", `${member}`);
            joinmessage = joinmessage.replace("{user.name}", `${member.user.tag}`);
            joinmessage = joinmessage.replace("{server}", `${member.guild.name}`);
            joinmessage = joinmessage.replace(
                "{membercount}",
                `${member.guild.memberCount}`
            );

            let embed = new MessageEmbed()
                .setColor(ee.color)
                .setDescription(joinmessage)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setColor("GREEN");

            let channel = data.Welcome;
            member.guild.channels.cache.get(channel).send(`Hey ${member} Welcome to ${member.guild.name}`)
            member.guild.channels.cache.get(channel).send(embed)

        } else if (!data2) {
            let embed2 = new MessageEmbed
                .setTitle("Welcome")
                .setDescription(
                    `${member}, Welcome to **${member.guild.name}**! We hope you like our Server! Enjoy Your Stay here!`
                )
                .setFooter(`We are now ${member.guild.memberCount} members`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setColor("GREEN");

            let channel = data.Welcome

            member.guild.channels.cache.get(channel).send(`Hey ${member} Welcome to ${member.guild.name}`)
            member.guild.channels.cache.get(channel).send(embed2)
        }
    }
})


