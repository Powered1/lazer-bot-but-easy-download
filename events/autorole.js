const ms = require('ms')
const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('../index')
const roleData = require('../utils/models/autorole');

/** 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */


client.on('guildMemberAdd', async (member) => {
    try {
        const data = await roleData
            .findOne({
                GuildID: member.guild.id,
            })
            .catch((err) => console.log(err));

        if (data) {
            let role = data.Role;
            let arole = member.guild.roles.cache.get(role);
            if (role) {
                member.roles.add(arole);
            } else if (!role) {
                return;
            }
        } else if (!data) {
            return;
        }
    } catch (e) {
        message.channel.send(e)
    }
})