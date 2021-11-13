const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const roleData = require('../../utils/models/autorole');


module.exports = {
    name: 'autorole',
    aliases: ['arole'],
    category: '⚙️ Config',
    memberpermissions: ['MANAGE_ROLES'],
    cooldown: 5,
    description: "Setup Auto Give In Server",
    usage: "autorole",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        if (!args[0]) {
            return message.channel.send(`\`Usage: ${prefix}autorole <@role|off>\``)
        }
        if (message.mentions.roles.first()) {
            const data = await roleData.findOne({
                GuildID: message.guild.id
            });

            if (data) {
                await roleData.findOneAndRemove({
                    GuildID: message.guild.id
                });

                message.channel.send(`Autorole is active and role set to ${message.mentions.roles.first()}`);

                let newData = new roleData({
                    Role: message.mentions.roles.first().id,
                    GuildID: message.guild.id
                });
                newData.save();
            } else if (!data) {
                message.channel.send(`Autorole is active and role set to ${message.mentions.roles.first()}`);

                let newData = new roleData({
                    Role: message.mentions.roles.first().id,
                    GuildID: message.guild.id
                });
                newData.save();
            }
        } else if (args[0] === "off") {
            const data2 = await roleData.findOne({
                GuildID: message.guild.id
            });

            if (data2) {
                await roleData.findOneAndRemove({
                    GuildID: message.guild.id
                });

                return message.channel.send(`Autorole has been turned off!`);

            } else if (!data2) {
                return message.channel.send(`Autorole isn't setup!`)
            }
        }
    }
}