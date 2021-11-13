const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const moment = require("moment")


module.exports = {
    name: 'serverinfo',
    aliases: ['sinfo'],
    category: '🔰 Info',
    memberpermissions: [],
    cooldown: 5,
    description: 'Show Information Of Server',
    usage: 'serverinfo',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            function trimArray(arr, maxLen = 25) {
                if (arr.array().length > maxLen) {
                    const len = arr.array().length - maxLen;
                    arr = arr.array().sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
                    arr.map(role => `<@&${role.id}>`)
                    arr.push(`${len} more...`);
                }
                return arr.join(", ");
            }
            await message.guild.members.fetch();
            function emojitrimarray(arr, maxLen = 20) {
                if (arr.length > maxLen) {
                    const len = arr.length - maxLen;
                    arr = arr.slice(0, maxLen);
                    arr.push(`${len} more...`);
                }
                return arr.join(", ");
            }

            let flags = {
                dubai: "<:flag_db:801544606730813490>",
                frankfurt: ":flag_de:",
                london: ":flag_gb:",
                amsterdam: ":flag_nl:",
                india: ":flag_in:",
                japan: ":flag_jp:",
                russia: ":flag_ru:",
                hong_kong: ":flag_hk:",
                brazil: ":flag_br:",
                europe: ":flag_eu:",
                sydney: ":flag_au:",
                south_africa: ":flag_za:",
                singapore: ":flag_sg:",
                us: ":flag_us:"
            };

            let guildRegion = message.guild.region
                .replace(/us-west/gi, `${flags.us} US West`)
                .replace(/us-east/gi, `${flags.us} US West`)
                .replace(/us-central/gi, `${flags.us} US West`)
                .replace(/us-south/gi, `${flags.us} US West`)
                .replace(/singapore/gi, `${flags.singapore} Singapore`)
                .replace(/southafrica/gi, `${flags.south_africa} South Africa`)
                .replace(/sydney/gi, `${flags.sydney} Sydney`)
                .replace(/europe/gi, `${flags.europe} Europe`)
                .replace(/brazil/gi, `${flags.brazil} Brazil`)
                .replace(/hongkong/gi, `${flags.hong_kong} Hong Kong`)
                .replace(/russia/gi, `${flags.russia} Russia`)
                .replace(/japan/gi, `${flags.japan} Japan`)
                .replace(/india/gi, `${flags.india} India`)
                .replace(/dubai/gi, `${flags.dubai} Dubai`)
                .replace(/amsterdam/gi, `${flags.amsterdam} Amsterdam`)
                .replace(/london/gi, `${flags.london} London`)
                .replace(/frankfurt/gi, `${flags.frankfurt} Frankfurt`)
                .replace(/eu-central/gi, `${flags.europe} Central Europe`)
                .replace(/eu-west/gi, `${flags.europe} Western Europe`);

            let afkChannel = message.guild.afkChannel
                ? message.guild.afkChannel
                : "None";
            let guildDescription = message.guild.description
                ? message.guild.description
                : "None";


            let boosts = message.guild.premiumSubscriptionCount;
            var boostlevel = 0;
            if (boosts >= 2) boostlevel = "1";
            if (boosts >= 15) boostlevel = "2";
            if (boosts >= 30) boostlevel = "3 / ∞";
            let maxbitrate = 96000;
            if (boosts >= 2) maxbitrate = 128000;
            if (boosts >= 15) maxbitrate = 256000;
            if (boosts >= 30) maxbitrate = 384000;
            message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setAuthor("Server Information About: " + message.guild.name, message.guild.iconURL({
                    dynamic: true
                }))
                .addField("❱ Owner", `${message.guild.owner.user}\n\`${message.guild.owner.user.tag}\``, true)
                .addField("❱ Guild Country", "\`" + guildRegion, true)
                .addField("❱ Guild Description", "\`" + guildDescription, true)
                .addField("❱ AFK Channel", "\`" + afkChannel, true)
                .addField("❱ Created On", "\`" + moment(message.guild.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(message.guild.createdTimestamp).format("hh:mm:ss") + "`", true)
                .addField("❱ You Joined", "\`" + moment(message.member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`" + moment(message.member.joinedTimestamp).format("hh:mm:ss") + "`", true)
                .addField("❱ All Channels", "👁‍🗨 \`" + message.guild.channels.cache.size + "\`", true)
                .addField("❱ Text Channels", "💬 \`" + message.guild.channels.cache.filter(channel => channel.type == "text").size + "\`", true)
                .addField("❱ Voice Channels", "🔈 \`" + message.guild.channels.cache.filter(channel => channel.type == "voice").size + "\`", true)

                .addField("❱ Total USERS", "😀 \`" + message.guild.memberCount + "\`", true)
                .addField("❱ Total HUMANS", "👤 \`" + message.guild.members.cache.filter(member => !member.user.bot).size + "\`", true)
                .addField("❱ Total BOTS", "🤖 \`" + message.guild.members.cache.filter(member => member.user.bot).size + "\`", true)

                .addField("❱ ONLINE", "🟢 \`" + message.guild.members.cache.filter(member => member.presence.status != "offline").size + "\`", true)
                .addField("❱ OFFLINE", ":black_circle:\`" + message.guild.members.cache.filter(member => member.presence.status == "offline").size + "\`", true)

                .addField("❱ Total Boosts", "\`" + message.guild.premiumSubscriptionCount + "\`", true)
                .addField("❱ Boost-Level", "\`" + boostlevel + "\`", true)
                .addField("❱ Max-Talk-Bitrate", "👾 \`" + maxbitrate + " kbps\`", true)

                .addField(`❱ [${message.guild.emojis.cache.size}] Emojis: `, "> " + message.guild.emojis.cache.size < 20 ? message.guild.emojis.cache.map(emoji => `${emoji}`).join(", ") : message.guild.emojis.cache.size > 20 ? emojitrimarray(message.guild.emojis.cache.map(emoji => `${emoji}`)).substr(0, 1024) : 'No Emojis')
                .addField(`❱ [${message.guild.roles.cache.size}] Roles: `, "> " + message.guild.roles.cache.size < 25 ? message.guild.roles.cache.array().sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : message.guild.roles.cache.size > 25 ? trimArray(message.guild.roles.cache) : 'None')
                .setThumbnail(message.guild.iconURL({
                    dynamic: true
                }))
                .setFooter("ID: " + message.guild.id, message.guild.iconURL({
                    dynamic: true
                })));
        } catch (e) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(e)
            )
        }
    }
}