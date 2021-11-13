const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const schema = require('../../utils/models/antiraid');



module.exports = {
    name: 'antiraid',
    aliases: ['anti-raid'],
    category: '⚙️ Config',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: 'Enables anti-raidmode and won\'t allow new members to join.',
    usage: "antiraid",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        options = [
            'enable',
            'disable'
        ]

        if (!args.length) return message.reply("Please enter either **enable** or **disable**")
        const opt = args[0].toLowerCase();
        if (!opt) return message.reply('Please enter either **enable** or **disable**')


        if (!options.includes(opt)) return message.reply('Please enter either **enable** or **disable**')

        if (opt === 'enable') {
            schema.findOne({ Guild: message.guild.id }, async (err, data) => {
                if (!data) {
                    data = new schema({
                        Guild: message.guild.id,
                    })
                    data.save()
                    message.reply(`Success! Anti-raidmode is enabled`)
                } else {
                    message.reply(`Anti-raidmode is already enabled`)
                }
            })

        }

        if (opt === 'disable') {
            schema.findOne({ Guild: message.guild.id }, async (err, data) => {
                if (!data) return message.reply('The Anti-raidmode has already been disabled')
                data.delete()
                message.reply('Anti-raidmode has been disabled')

            })

        }
    }
}