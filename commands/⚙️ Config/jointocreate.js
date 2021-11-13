const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');


module.exports = {
    name: 'jointocreate',
    aliases: ["j2c"],
    category: '⚙️ Config',
    memberpermissions: ['MANAGE_CHANNELS'],
    cooldown: 5,
    description: "Setup The Join to Create  in Guild",
    usage: "jointocreate",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        const channel = message.guild.channels.cache.find(ch => ch.name === "🔊｜ᴊᴏɪɴ-ᴛᴏ-ᴄʀᴇᴀᴛᴇ");

        if (!channel) {
            message.guild.channels.create('🔊｜ᴊᴏɪɴ-ᴛᴏ-ᴄʀᴇᴀᴛᴇ', {
                type: 'voice',
                topic: "This Channel Used For JOIN TO CREATE and If You Delete this channel chat bot not work you need to again setup chatbot",
                // parent: channel.id,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL', 'SPEAK', 'CONNECT'],
                    },
                    { //giving the Bot himself permissions
                        id: client.user.id,
                        allow: ["MANAGE_MESSAGES", "MANAGE_CHANNELS", "ADD_REACTIONS", "SEND_MESSAGES", "MANAGE_ROLES"]
                    }
                ]
            }).then((ch) => {
                return message.channel.send(
                     new MessageEmbed()
                .setColor(ee.color)
                        .setDescription(` > ** Join To Create Setup Completed Go <#${ch.id}> and Join to Create Your Voice Channel ** \n > ** Don't Change Name of Join to Create Channel Otherwise IT Will Not Work ** `)
                )
            })
        }

        if (channel) {
            message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription(`> **Chat Channel Already Setup <#${channel.id}> ** \n > ** Don't Change Name of Chat Bot Channel Otherwise Chat Will Not Work ** `)
            )
        }

    }
}

