const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'unban',
    aliases: ['ajaback'],
    category: '🚫 Administration',
    memberpermissions: ['BAN_MEMBERS'],
    cooldown: 5,
    description: 'Add role a user',
    usage: 'unban + <@user> + <@reason>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        let bannedMember = await client.users.fetch(args[0])
        // if not a member
        if (!bannedMember) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle(`**Please Give to Unban user**`)
                    .setDescription(`> Usage =  ${prefix}unban + <ID> + <reason>`)
                    .setFooter(ee.footertext)
            )
        }

        if (isNaN(args[0])) return message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription("**You need to provide an Valid User ID.**")
                .setFooter(ee.footertext)
        )


        let reason = args.slice(1).join(" ")

        // if not a Role
        if (!reason) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`**Please Give Reason **`)
                    .setFooter(ee.footertext)
            )
        }

        // add role to user
        if (bannedMember) {
            await message.guild.members.unban(bannedMember, reason).catch(e => console.log(e))
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.colour)
                    .setDescription(`> ${bannedMember} Unbanned From Guild \n\n > Reason = \`\`${reason}\`\``)
                    .setThumbnail(bannedMember.displayAvatarURL({ dynamic: true }))
                    .setFooter(` UnBanned by ${message.author.username}`)
            )
        }


    }
}