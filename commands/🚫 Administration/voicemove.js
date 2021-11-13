const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const ms = require('ms')

module.exports = {
    name: 'voicemove',
    aliases: ['vcmove'],
    category: '🚫 Administration',
    memberpermissions: ['MOVE_MEMBERS'],
    cooldown: 5,
    description: "Move Member in Bot Channel",
    usage: "voicemove",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        let memberchannel = message.member.voice.channel;

        if (!memberchannel) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Please Join Voice Channel First`)
                    .setFooter(ee.footertext)
            )
        }

        if (!message.guild.me.voice.connection) {

            memberchannel.join().then((c) => {

                message.guild.me.voice.setSelfDeaf(true);

                message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`\`\`I am In Your In VC , Now Drag me VC in Which You Want to Go \`\``)
                        .setFooter(ee.footertext, "Thanks Tyson")

                )

                client.on('voiceStateUpdate', async (oldstate, newstate) => {
                    const channel = oldstate.member.voice.channel;
                    const targetchannel = message.guild.channels.cache.get(newstate.member.voice.channel.id)


                    if (newstate.member.voice.channel && newstate.member.voice.channel.id != memberchannel.id) {
                        if (client.user.id === newstate.member.user.id) {
                            memberchannel.members.forEach((move) => {
                                move.voice.setChannel(targetchannel)

                                targetchannel.leave()
                            })
                        }
                    } else {
                        message.channel.send(
                            new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`I am Already in Voice Channel`)
                                .setFooter(ee.footertext, "Thanks Tyson")
                        )
                    }
                })
            })
        }
    }
}