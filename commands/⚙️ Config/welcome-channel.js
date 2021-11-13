const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const joinchannel = require('../../utils/models/welcome');


module.exports = {
    name: 'welcome-channel',
    aliases: ["jchannel", "welcome"],
    category: '⚙️ Config',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: "Setup The Welcome Channel in Guild",
    usage: "welcome-channel",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        if (!args[0]) {
            return message.channel.send(`\`Usage: ${prefix}welcome-channel <#channel|off>\``);
        }
        if (message.mentions.channels.first()) {
            const data = await joinchannel.findOne({
                GuildID: message.guild.id,
            });

            if (data) {
                await joinchannel.findOneAndRemove({
                    GuildID: message.guild.id,
                });

                message.channel.send(
                    `Join Channel set to ${message.mentions.channels.first()}`
                );

                let newData = new joinchannel({
                    Welcome: message.mentions.channels.first().id,
                    GuildID: message.guild.id,
                });
                newData.save();
            } else if (!data) {
                message.channel.send(
                    `Join Channel set to ${message.mentions.channels.first()}`
                );

                let newData = new joinchannel({
                    Welcome: message.mentions.channels.first().id,
                    GuildID: message.guild.id,
                });
                newData.save();
            }
        } else if (args[0] === "off") {
            const data2 = await joinchannel.findOne({
                GuildID: message.guild.id,
            });

            if (data2) {
                await joinchannel.findOneAndRemove({
                    GuildID: message.guild.id,
                });

                return message.channel.send(`Join channel has been turned off!`);
            } else if (!data2) {
                return message.channel.send(`Join channel isn't setup!`);
            }
        }
    }
}