const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('../index')
const moment = require('moment');
const { afk } = require('../utils/tools/afk');

client.on('message', (message) => {
    if (!message.guild || message.author.bot) return;

    const mentionedMember = message.mentions.members.first();
    if (mentionedMember) {
        const data = afk.get(mentionedMember.id);

        if (data) {
            const [timestamp, reason] = data;
            const timeAgo = moment(timestamp).fromNow();

            message.reply(
                `${mentionedMember} is currently afk (${timeAgo})\nReason: ${reason}`
            );
        }
    }

    const getData = afk.get(message.author.id);
    if (getData) {
        afk.delete(message.author.id);
        message.reply(`Welcome back, i have removed your afk!`);
    }
})
