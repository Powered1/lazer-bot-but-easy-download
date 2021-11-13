const { Client, Message, MessageEmbed } = require('discord.js');
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
    name: 'delrolefromeveryone',
    aliases: ["rrall", "rroleall", "takeroleall"],
    category: '🚫 Administration',
    memberpermissions: ['ADMINISTRATOR'],
    cooldown: 5,
    description: "remove a role from all user of the current server",
    usage: 'removeroleall <roles>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, prefix) => {
        try {
            const [key, ...value] = args;

            switch (key) {
                case "bot":
                    {
                        const role =
                            message.guild.roles.cache.find(
                                role => role.name === args.join(" ").slice(2)
                            ) ||
                            message.mentions.roles.first() ||
                            message.guild.roles.cache.get(args.join(" ").slice(2));

                        if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
                            return message.channel.send(
                                new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`My role is not high enough than **${role.name}** role!`)
                            );
                        }

                        if (message.member.roles.highest.comparePositionTo(role) < 0) {
                            return message.channel.send(
                                new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`Your role must be higher than **${role.name}** role!`)
                            );
                        }

                        if (!role) {
                            return message.channel.send(new MessageEmbed()
                                .setColor(ee.color).setDescription("Please provide a valid role"));
                        }

                        message.guild.bot.cache.forEach(member => member.roles.add(role));

                        message.channel.send(
                            new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(` ✅ Successfully Added **${role.name}** to Bot`)
                        );
                    }
                    break;
                case "member": {
                    const role =
                        message.guild.roles.cache.find(
                            role => role.name === args.join(" ").slice(2)
                        ) ||
                        message.mentions.roles.first() ||
                        message.guild.roles.cache.get(args.join(" ").slice(2));

                    if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
                        return message.channel.send(
                            new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`My role is not high enough than **${role.name}** role!`)
                        );
                    }

                    if (message.member.roles.highest.comparePositionTo(role) < 0) {
                        return message.channel.send(
                            new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`Your role must be higher than **${role.name}** role!`)
                        );
                    }

                    if (!role) {
                        return message.channel.send(
                            new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription("Please provide a valid role")
                        );
                    }

                    message.guild.members.cache.forEach(member => member.roles.add(role));

                    message.channel.send(
                        new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(` ✅ Successfully Added **${role.name}** to member`)
                    );
                }
            }

            const role =
                message.guild.roles.cache.find(
                    role => role.name === args.join(" ").slice(1)
                ) ||
                message.mentions.roles.first() ||
                message.guild.roles.cache.get(args.join(" ").slice(1));

            if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`My role is not high enough than **${role.name}** role!`)
                );
            }

            if (message.member.roles.highest.comparePositionTo(role) < 0) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`Your role must be higher than **${role.name}** role!`)
                );
            }

            if (!role) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription("Please provide a valid role")
                );
            }

            message.guild.members.cache.forEach(member => member.roles.remove(role));

            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`Successfully Removed **${role.name}** from Everyone`)
            );
        } catch (e) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(e)
            )
        }
    }
}