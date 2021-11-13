const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');


module.exports = {
    name: 'setuprules',
    aliases: ["rules", 'setup-rules'],
    category: '⚙️ Config',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: "Setup The Rules in Guild",
    usage: "jointocreate",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        // rules 1
        let rules1 = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`\`\`🔰 General Rules 🔰\`\``)
            .setFooter(ee.footertext)
            .setThumbnail("https://media.discordapp.net/attachments/691896715661410365/808632776331886602/Black_and_Pink_Glitch_Gaming_Facebook_Cover_1.gif")
            .setDescription(`
            > 1️  :- Treat all members with respect.\n
            > 2️  :- Harassment, abuse, hate speech or any kind of discriminatory speech will not be tolerated.\n
            > 3️  :- Do not in any way intentionally offend any member in the Discord server.\n
            > 4️  :- Racial or offensive slurs will not be tolerated.\n
            > 5️  :- Tagging a member/staff member without reason will result in a warning.\n
            > 6️  :- Revealing private information about any individual; is a zero tolerance rule.\n
            > 7️  :- Do not publicly accuse other users/players of misconduct.\n
            > 8️  :- No backseat modding.\n
            > 9️  :- No talking about topics related to religion or politics.\n
            > 1️0 :- Words or small sentences in other languages other than English are allowed only for the purpose of teaching someone, or for clarification.\n
            > 11 :- We welcome constructive criticism but have zero tolerance for aggressive or entitled demands.\n
            > 12 :- Female Members Of The Server Are Supposed To Verify Themselves Through Voice Channels By Female Moderators As Soon As Possible Upon Joining Server Also If Already In Server To Avoid Certain Scenarios, Impersonating Using Fake Female Accounts Will Get Permanent Server Ban Once Proven.
            `)


        // rules 2

        let rules2 = new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail("https://media.discordapp.net/attachments/691896715661410365/808632776331886602/Black_and_Pink_Glitch_Gaming_Facebook_Cover_1.gif")
            .setTitle(`\`\`🔰 Chat Rules 🔰\`\``)
            .setFooter(ee.footertext)
            .setDescription(`
       > 1️3  :- Don’t Spam (Emoji , same msg again & again or Dont spam for Level Increase.\n
       > 14  :- If any of staff member is asking to Change the Topic of conversation then it needs to be changed, if it gets too offensive to other members. If not followed, there are kick/ban.\n
       > 15  :- We highly request to our old members to welcome new members & try including them in your conversation. Don’t act creepy or rude towards the new members because they do not know how to behave in server.\n
       > 16  :- Respect all staff and follow their instruction , Do not Use Abusive/odd Names/ Profile Pictures. If Any mod Found You Guilty they Can Change Your Name Any time.\n
       > 17  :- Don’t expose anyone. Do not send any private information of anyone without permission. That includes pictures.\n
       > 18  :- Do not randomly tag staff if unnecessary.\n
       > 19  :- If you are annoyed by someone: Just block the person and move on.\n
       > 20  :- Have common sense to understand puns/sarcasm.\n
       > 21  :- Do not misbehave with girls and respect each and everyone member in the server.\n
       > 22  :- Excessive use of bad language will lead to permanent ban/kick.\n
       `)


        // rules 3

        let rules3 = new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail("https://media.discordapp.net/attachments/691896715661410365/808632776331886602/Black_and_Pink_Glitch_Gaming_Facebook_Cover_1.gif")
            .setTitle(`\`\`🔰 Voice Rules 🔰\`\``)
            .setFooter(ee.footertext)
            .setDescription(`
       > 23  :- Posting any content related to piracy, cheats, cracks, exploits or any kind of copyright breaching materials is forbidden.\n
       > 24  :- Any malicious activity toward the server or any member is forbidden.\n
       > 25  :- This server follows all the Discord Guidelines and TermsOfServices. Please do read and follow all them listed.\n
       > 26  :- Threats such as DDoS, DoX, or generalized threats are strictly prohibited and will result in an immediate removal/ban from the community.\n
       > 27  :- Any attempts to “rape” other fellow community members is strictly prohibited and will result in an immediate removal/ban from the server.\n
       > 28  :- Do not Argue With Any Mod/Staff. Their Decision will be last Decision\n
       > 29  :-  Do not use voice changer in vc, this will lead to permanent ban from the server.\n
       > 30  :- Do not blow air in the mic or else you will be banned from vc.\n
       `)

        let follow = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`🔰 ** Read All Rules CareFully ** 🔰`)
            .setDescription(`\`\`Read the above rules carefully and do follow them.\n⭕ Note: The rules will be changed as per the requirements in the future.  \`\``)
            .setImage("https://media.discordapp.net/attachments/691896715661410365/808632776331886602/Black_and_Pink_Glitch_Gaming_Facebook_Cover_1.gif")
            .setFooter(ee.footertext)

        message.channel.send(`@everyone`)
        message.channel.send(rules1);
        message.channel.send(rules2);
        message.channel.send(rules3);
        message.channel.send(follow).then(msg => msg.react("✅"))
    }
}

