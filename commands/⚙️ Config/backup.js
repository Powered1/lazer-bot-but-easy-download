const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');
const backup = require("discord-backup");


module.exports = {
    name: 'backup',
    aliases: ["backupserver"],
    category: '⚙️ Config',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: "Create and Load Backup in a Guild",
    usage: "backup",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {

        if(message.author.id === message.guild.owner.id) return;
        
        if (!args[0]) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`1. \`\`To Create Backup Type ${prefix}backup create\`\` \n 2.  \`\`To Load Backup Type ${prefix}backup load \`\` \n 3. \`\`To Info about a Backup Type ${prefix}backup info \`\` `)
                    .setFooter(ee.footertext)
            )
        }

        // creating backup
        if (args[0] === 'create') {
            // Create the backup
            backup.create(message.guild, {
                jsonBeautify: true
            }).then((backupData) => {
                // And send informations to the backup owner
                message.author.send("The backup has been created! To load it, type this command on the server of your choice: `" + prefix + "backup load " + backupData.id);
                message.channel.send(new MessageEmbed()
                    .setDescription('Backup has been created and saved to my data. to load your backup, please go to your dms, copy the id that i given, then load it.')
                    .setColor(ee.color)
                    .setFooter('Backup created at')
                    .setTimestamp());
            }).catch((e) => {
                return message.reply(
                    new MessageEmbed()
                        .setDescription(`'Please open your dms, i cant dm you the backup code!'`)
                )
            })
        }


        // loading backup
        if (args[0] === 'load') {
            let backupID = args[1];
            if (!backupID) {
                return message.reply(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`You must specify a valid backup ID!`)
                        .setFooter(ee.footertext)
                )
            }

            // Fetching the backup to know if it exists
            backup.fetch(backupID).then(async () => {
                // If the backup exists, request for confirmation
                message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(":warning: | When the backup is loaded, all the channels, roles, etc. will be replaced! Type `-confirm` to confirm!")
                        .setFooter(ee.footertext)
                );
                await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "-confirm"), {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                }).catch((err) => {
                    // if the author of the commands does not confirm the backup loading
                    return message.channel.send(
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(":x: | Time's up! Cancelled backup loading!")
                            .setFooter(ee.footertext)
                    );
                });
                // When the author of the command has confirmed that he wants to load the backup on his server
                message.author.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(":white_check_mark: | Start loading the backup!")
                        .setFooter(ee.footertext)
                );
                // Load the backup
                backup.load(backupID, message.guild).then(() => {
                    // When the backup is loaded, delete them from the server
                    backup.remove(backupID);
                }).catch((err) => {
                    // If an error occurred
                    return message.author.send(
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(":x: | Sorry, an error occurred... Please check that I have administrator permissions!")
                            .setFooter(ee.footertext)
                    );
                });
            }).catch((err) => {
                console.log(err);
                // if the backup wasn't found
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(":x: | No backup found for `" + backupID + "`!")
                        .setFooter(ee.footertext)
                );
            });

        }


        // info backup


        if (args[0] === 'info') {
            let backupID = args[1];
            if (!backupID) {
                return message.reply(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`You must specify a valid backup ID!`)
                        .setFooter(ee.footertext)
                )
            }

            // fetch backup

            backup.fetch(backupID).then((backupInfos) => {
                const date = new Date(backupInfos.data.createdTimestamp);
                const yyyy = date.getFullYear().toString(), mm = (date.getMonth() + 1).toString(), dd = date.getDate().toString();
                const formatedDate = `${yyyy}/${(mm[1] ? mm : "0" + mm[0])}/${(dd[1] ? dd : "0" + dd[0])}`;
                let embed = new MessageEmbed()
                    .setAuthor("Backup Informations")
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    // Display the backup ID
                    .addField(`>\`\` Backup ID = ${backupInfos.id} \`\``, false)
                    // Displays the server from which this backup comes
                    .addField(`> \`\` Server ID = ${backupInfos.data.guildID}\`\``, false)
                    // Display the size (in mb) of the backup
                    .addField(`> \`\` Backup Size = ${backupInfos.size} \`\``, false)
                    // Display when the backup was created
                    .addField(`> \`\` Created at ${formatedDate} \`\``, false)
                    .setColor(ee.color)
                    .setFooter(ee.footertext)
                message.channel.send(embed);
            }).catch((err) => {
                // if the backup wasn't found
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`> \`\` No Backup For ${backupID} \`\``)
                        .setFooter(ee.footertext)
                );
            });
        }
    }
}
