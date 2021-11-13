const { Client, Message, MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json')
module.exports = {
    name: 'invite',
    category: "🔰 Info",
    aliases: ['inv'],
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        message.channel.send(
             new MessageEmbed()
                .setColor(ee.color)
                .setColor('BLUE')
    
                .setTitle("Invite & Support Link!")
                .addField("**Invite Link**", `[Click here to invite me](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`)
                .addField("**Support Server**", `[Click to join support Server](https://discord.gg/REAW5VM)`)
                .setFooter(`Requested by ${message.author.tag}`, client.user.displayAvatarURL())
                .setTimestamp()


        )

    }
}