const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
var config = require("../../config/config.json");
const ms = require("ms");
const Schema = require("../../utils/models/mute");

module.exports = {
  name: "mute",
  aliases: ["chup"],
  category: '🚫 Administration',
  memberpermissions: ['MUTE_MEMBERS'],
  description: 'Mutes a User for a specific Time!',
  useage: 'mute @User <Time+Format(e.g: 10m)> [REASON]',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MUTE_MEMBERS"))
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription(
              "**You Dont Have The Permissions To Mute Users! - [ADMINISTRATOR]**"
            )
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    // if not member
    let member = message.mentions.members.first();
    if (!member)
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription(
              " Please Mention a USER to Mute ! Usage: `mute @User <Time+Format(e.g: 10m)> [REASON]` example: `mute @User 10m He/She is Abusing!`"
            )
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    args.shift(); //shift args

    // if role is same
    if (
      member.roles.highest.position >= message.member.roles.highest.position
    ) {
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription(
              ":x: I cannot mute this Member, because He/She is higher/Equal to Your Role Position!"
            )
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    }

    // removing role
    if (!message.guild.me.permissions.has("MANAGE_ROLES"))
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription(
              "**I need the permission, to Manage Roles aka give roles**"
            )
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    // time
    let time = args[0];
    if (!time)
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription(
              "**please add a TIME! Usage: `mute @User ``<Time+Format(e.g: 10m)>`` [REASON]` example: `mute @User 10m He/She is Abusing`**"
            )
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    args.shift();

    // reason

    let reason = args.join(" ");

    let allguildroles = message.guild.roles.cache.array();

    let mutedrole = false;
    for (let i = 0; i < allguildroles.length; i++) {
      if (allguildroles[i].name.toLowerCase().includes("muted")) {
        mutedrole = allguildroles[i];
        break;
      }
    }

    if (!mutedrole) {
      if (!message.guild.me.permissions.has("MANAGE_GUILD"))
        return message.channel
          .send(
            new MessageEmbed()
              .setColor(ee.color)
              .setColor(ee.color)

              .setDescription(
                "**I need the permission, to Manage Roles aka give roles**"
              )
              .setFooter(
                client.user.displayAvatarURL({ dynamic: true }),
                ee.footertext
              )
          )
          .then((msg) => {
            msg.delete({ timeout: 5000 });
          });

      let highestrolepos = message.guild.me.roles.highest.position;
      console.log(Number(highestrolepos) - 1);
      mutedrole = await message.guild.roles
        .create({
          data: {
            name: "muted",
            color: "#222222", //grey color
            hoist: false, //hoist true
            position: Number(highestrolepos) - 1, //muted role under highest Bot Role!
            //permissions: ["SEND_MESSAGES"]
          },
          reason: "This role got created, to mute Members!",
        })
        .catch((e) => {
          console.log(e);
          message.channel
            .send(
              new MessageEmbed()
                .setColor(ee.color)
                .setColor(ee.color)

                .setDescription("**I COULD NOT CREATE A ROLE, sorry**")
                .setFooter(
                  client.user.displayAvatarURL({ dynamic: true }),
                  ee.footertext
                )
            )
            .then((msg) => {
              msg.delete({ timeout: 5000 });
            });
        });
    }

    if (mutedrole.position > message.guild.me.roles.highest.position) {
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription(
              "**:x: I cannot access the Role, because it's above me!**"
            )
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    }

    let mutetime;
    try {
      mutetime = ms(time);
    } catch {
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription(
              "**ERROR, please add a TIME! Usage: `mute @User <Time+Format(e.g: 10m)> [REASON]` example: `mute @User 10m He is doing bad stuff!`**"
            )
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    }
    if (!mutetime || mutetime === undefined)
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription(
              "**ERROR, please add a TIME! Usage: `mute @User <Time+Format(e.g: 10m)> [REASON]` example: `mute @User 10m He is doing bad stuff!`**"
            )
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    await message.guild.channels.cache.forEach((ch) => {
      try {
        ch.updateOverwrite(mutedrole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          CONNECT: false,
          SPEAK: false,
        });
      } catch (e) {
        console.log(e);
      }
    });

    // mute add add

    try {
      member.roles.add(mutedrole);

      Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) {
          new Schema({
            Guild: message.guild.id,
            Users: member.id,
          }).save();
        } else {
          data.Users.push(member.id);
          data.save();
        }
      });
    } catch {
      message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)

            .setDescription("**Something went wrong!**")
            .setFooter(ee.footertext)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    }

    // send messages

    let embed = new MessageEmbed()
      .setColor(ee.color)
      .setColor(ee.color)
      .setTitle(`Muted: \`${member.user.tag}\``)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter(
        `By: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `He/you is now muted for \`${ms(mutetime, {
          long: true,
        })} Tell Moderator To Unmute you..\`${reason ? `\n\n**REASON**\n> ${reason.substr(0, 1800)}` : "\nNO REASON"
        }`
      );
    message.channel.send(embed).catch((e) => console.log(e));

    member
      .send(embed.setTitle(`You got muted by: \`${message.author.tag}\``))
      .catch((e) => console.log(e));

    setTimeout(() => {
      try {
        member.send(
          embed
            .setTitle(`You got unmuted: \`${member.user.tag}\``)
            .setDescription("\u200b")
        )
          .catch((e) => console.log(e));
        member.roles.remove(mutedrole);
      } catch {
        message.channel.send(
          new MessageEmbed()
            .setColor(ee.color)
            .setColor(ee.color)
            .setDescription("**Something went wrong!**")
            .setFooter(ee.footertext)
        );
      }
    }, mutetime);
  },
};
