const { Client, GuildMember, MessageEmbed } = require('discord.js');
const client = require('../index')
const schema = require('../utils/models/antiraid');


client.on('guildMemberAdd', (member) => {
    try {
        schema.findOne({ Guild: member.guild.id }, async (err, data) => {
            const kickReason = 'Anti-raidmode activated';
            if (!data) return;
            if (data) {
                try {
                    member.send(
                        new MessageEmbed()
                            .setTitle(`Server Under Lockdown`)
                            .setDescription(
                                `You have been kicked from **${member.guild.name
                                }** with reason: **${kickReason}**`
                            )
                            .setColor('RED')
                    );
                } catch (e) {
                    throw e
                }
                member.kick(kickReason);
            }
        });
    } catch (e) {
        console.log(e)
    }
})