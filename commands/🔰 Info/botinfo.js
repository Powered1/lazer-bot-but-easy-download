const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const moment = require("moment")

const flags = {
    DISCORD_EMPLOYEE: 'Discord Employee',
    DISCORD_PARTNER: 'Discord Partner',
    BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: 'HypeSquad Events',
    HOUSE_BRAVERY: 'House of Bravery',
    HOUSE_BRILLIANCE: 'House of Brilliance',
    HOUSE_BALANCE: 'House of Balance',
    EARLY_SUPPORTER: 'Early Supporter',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    VERIFIED_DEVELOPER: 'Verified Bot Developer'
};
function trimArray(arr, maxLen = 25) {
    if (arr.array().length > maxLen) {
        const len = arr.array().length - maxLen;
        arr = arr.array().sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
        arr.map(role => `<@&${role.id}>`)
        arr.push(`${len} more...`);
    }
    return arr.join(", ");
}
const statuses = {
    "online": "🟢",
    "idle": "🟠",
    "dnd": "🔴",
    "offline": "⚫️",
}


module.exports = {
    name: 'botinfo',
    aliases: ['binfo'],
    category: '🔰 Info',
    memberpermissions: [],
    cooldown: 5,
    description: 'Show Information Of bot',
    usage: 'botinfo [@bot] [global]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            var bot = message.mentions.users.first() || message.author.bot;

            if (!bot || bot == null || bot.id == null || !bot.id) return message.reply("bot Not Found");

            const member = message.guild.members.cache.get(bot.id);
            //create the EMBED
            const embedbotinfo =  new MessageEmbed()
 .setColor(ee.color)
            embedbotinfo.setThumbnail(bot.displayAvatarURL({ dynamic: true, size: 512 }))
            embedbotinfo.setAuthor("Information about:   " + bot.username + "#" + bot.discriminator ,bot.displayAvatarURL({ dynamic: true }))
            embedbotinfo.addField('**❱ botname:**', `<@${bot.username}>\n\`${bot.tag}\``, true)
            embedbotinfo.addField('**❱ ID:**', `\`${bot.id}\``, true)
            embedbotinfo.addField('**❱ Avatar:**', `[\`Link to avatar\`](${bot.displayAvatarURL({ format: "png" })})`, true)
            embedbotinfo.addField('**❱ Date Join DC:**', "\`" + moment(bot.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(bot.createdTimestamp).format("hh:mm:ss") + "\`", true)
            embedbotinfo.addField('**❱ Is a Bot:**', `\`${bot.bot ? "✔️" : "❌"}\``, true)
            embedbotinfo.setFooter(ee.footertext, ee.footericon)
            //send the EMBED
            message.channel.send(embedbotinfo)
        } catch (e) {
            message.channel.send(
                 new MessageEmbed()
                .setColor(ee.color)
                    .setDescription(e)
            )
        }
    }
}