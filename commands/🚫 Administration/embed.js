const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'embed',
    aliases: ['pl'],
    category: '🚫 Administration',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: 'Create Embed in Server',
    usage: '[COMMAND] + [Channel] + [Question]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        let channel = message.mentions.channels.first() || message.channel;

        if (!channel) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Please Mention a Channel to Send Embed`)
                    .setFooter(ee.footertext)
            )
        }

        let embed = new MessageEmbed();
        message.reply(
            new MessageEmbed()
                .setDescription(`> What is Tittle Of Embed ? || if not then type \`\`'none'\`\``)
        )
            .then(m => m.delete({ timeout: 30000 }));
        let title = await message.channel.awaitMessages(
            res => res.author.id === message.author.id,
            {
                max: 1,
                time: 30000
            }
        );

        if (title.size) {
            if (title.first().content !== "none") {
                if (title.first().length > 256)
                    return message.reply(
                        new MessageEmbed()
                            .setDescription(`> Title Can not Biger Than 256 words`)
                    )
                        .then(m => m.delete({ timeout: 5000 }));
                embed.setTitle(title.first().content);
            }
        }

        message
            .reply(
                new MessageEmbed()
                    .setDescription(`> What is Description of Embed ? || if not then type \`\`'none'\`\``)
            )
            .then(m => m.delete({ timeout: 30000 }));
        let description = await message.channel.awaitMessages(
            res => res.author.id === message.author.id,
            {
                max: 1,
                time: 30000
            }
        );

        if (description.size) {
            if (description.first().content !== "none") {
                if (description.first().length > 2048)
                    return message.reply(
                        new MessageEmbed()
                            .setDescription(`Description Can not Bigger than 2048 Words`)
                    )
                        .then(m => m.delete({ timeout: 5000 }));
                embed.setDescription(description.first().content);
            }
        }

        message
            .reply(
                new MessageEmbed()
                    .setDescription(`> What is Colour of Embed ? Please Put Hex Code of Colour || if not then type \`\`'none'\`\``)
            )
            .then(m => m.delete({ timeout: 30000 }));
        let color = await message.channel.awaitMessages(
            res => res.author.id === message.author.id,
            {
                max: 1,
                time: 30000
            }
        );

        embed.setColor(color.first().content);

        message
            .reply(
                new MessageEmbed()
                    .setDescription(`> What is Footer of Embed ? || if not then type \`\`'none'\`\``)
            )
            .then(m => m.delete({ timeout: 30000 }));
        let footer = await message.channel.awaitMessages(
            res => res.author.id === message.author.id,
            {
                max: 1,
                time: 30000
            }
        );

        if (footer.size) {
            if (footer.first().content !== "none") {
                if (footer.first().length > 100)
                    return message
                        .reply(
                            new MessageEmbed()
                                .setDescription(`> Footer can not Bigger Than 100 Words`)
                        )
                        .then(m => m.delete({ timeout: 5000 }));
                embed.setFooter(footer.first().content);
            }
        }

        // message.channel.send(embed);
        channel.send(embed)
        message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`> Embed Sent to <#${channel.id}>`)
                .setFooter(ee.footertext)
        ).then(msg => msg.delete({ timeout: 3000 }))
    }

}