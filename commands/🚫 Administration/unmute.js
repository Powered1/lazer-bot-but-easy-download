const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const Schema = require("../../utils/models/mute");


module.exports = {
    name: 'unmute',
    aliases: ['mafkiya'],
    category: '🚫 Administration',
    memberpermissions: ['MUTE_MEMBERS'],
    description: 'unmute a User!',
    useage: 'unmute @User [REASON]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let member = message.mentions.members.first();
        if (!member) return message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription("** Please Mention a User Usage: `unmute @User reason`**")
                .setFooter(ee.footertext)
        )
        args.shift(); //shift args

        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription("** I Cannot Mute This Member , because He/She is Equal To Your Role **")
                    .setFooter(ee.footertext)
            )
        }

        let allguildroles = message.guild.roles.cache.array();

        let mutedrole = false;
        for (let i = 0; i < allguildroles.length; i++) {
            if (allguildroles[i].name.toLowerCase().includes("muted")) {
                mutedrole = allguildroles[i];
                break;
            }
        }
        if (!mutedrole) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription("** Mute Role Not Found **")
                    .setFooter(ee.footertext)
            )
        }
        if (!message.member.permissions.has("ADMINISTRATOR") && mutedrole.position > message.guild.me.roles.highest.position) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription("** I cannot access the Role, because it's above me!**")
                    .setFooter(ee.footertext)
            )
        }

        let reason = args.slice(1).join(" ")

        if (!reason) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription("** Please Give Reason to Unmute User **")
                    .setFooter(ee.footertext)
            )
        }
        Schema.findOne({
            Guild: message.guild.id,
        }, async (err, data) => {
            if (!data) return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription("** You never muted someone, Muted Role Not Exist**")
                    .setFooter(ee.footertext)
            )
            const user = data.Users.findIndex((prop) => prop === member.id)
            if (user == -1) return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setAuthor(message.author.tag)
                    .setDescription("** You never muted someone, Muted Role Not Exist**")
                    .setFooter(ee.footertext)
            )
            data.Users.splice(user, 1)
        })
        try {
            await member.roles.remove(mutedrole);
        } catch {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription("**Something went wrong!**")
                    .setFooter(ee.footertext)
            )
        }

        message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`> <@${member.user.id}> Unmuted \n\n > Reason = \`\`${reason}\`\``)
                .setFooter(`Unmuted By ${message.author.username}`)
        )
        try {
            member.send(embed.setTitle(`You got unmuted by: \`${message.author.tag}\``))
        } catch {
        }
    }
}