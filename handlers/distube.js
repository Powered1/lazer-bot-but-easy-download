const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix, config } = require("..");
const distube = require("../utils/distubeClient");
const ee = require('../config/embed.json')
/**
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
module.exports = async (client, message, args) => {
  const status = (queue) =>
    `Volume: ${queue.volume}% | Filter: ${queue.filter || " ❌ Off"} | Loop: ${
      queue.repeatMode
        ? queue.repeatMode == 2
          ? "All Queue"
          : " ✅ This Song"
        : "Off"
    } | Autoplay: ${queue.autoplay ? " ✅ On" : " ❌ Off"}`;

  // play song
  distube.on("playSong", (message, queue, song) => {
    message.channel
      .send(
         new MessageEmbed()
                .setColor(ee.color)
          .setTitle(`Playing Song`)
          .setDescription(`Song: [\`${song.name}\`](${song.url})`)
          .addField("Requested by:", `>>> ${song.user}`, true)
          .addField(
            "Duration:",
            `>>> \`${queue.formattedCurrentTime} / ${song.formattedDuration}\``,
            true
          )
          .setThumbnail(song.thumbnail)
          .setFooter(status(queue))
      )
      .then(async (msg) => {
        await msg.react("⏭");
        await msg.react("⏯");
        await msg.react("🔉");
        await msg.react("🔊");
        await msg.react("🔁");

        const filter = (reaction, user) =>
          ["⏭", "⏯", "🔉", "🔊", "🔁", "⏹"].includes(
            reaction.emoji.id || reaction.emoji.name
          ) && user.id !== message.client.user.id;
        var collector = await msg.createReactionCollector(filter, {
          time: song.duration > 0 ? song.duration * 1000 : 600000,
        });

        collector.on("collect", async (reaction, user) => {
          //return if no queue available
          if (!queue) return;

          //create member out of the user
          const member = reaction.message.guild.member(user);

          //remoe the reaction
          reaction.users.remove(user);

          if (
            !member.voice.channel ||
            member.voice.channel.id !== member.guild.me.voice.channel.id
          )
            return message.channel.send(
               new MessageEmbed()
                .setColor(ee.color).setDescription(
                " You must join a Voice Channel"
              )
            );

          switch (reaction.emoji.id || reaction.emoji.name) {
            // skip reaction
            case "⏭":
              queue.playing = true;
              reaction.users.remove(user).catch(console.error);
              queue.connection.dispatcher.end();
              message.channel
                .send(
                   new MessageEmbed()
                .setColor(ee.color).setDescription(
                    `\`Song Skipped\` By ${message.author.username}`
                  )
                )
                .then((msg) => {
                  msg.delete({
                    timeout: 5000,
                  });
                });
              collector.stop();
              break;

            // pause and resume reaction

            case "⏯":
              reaction.users.remove(user).catch(console.error);
              if (queue.playing) {
                queue.playing = !queue.playing;
                distube.pause(message);
                message.channel
                  .send(
                     new MessageEmbed()
                .setColor(ee.color).setDescription(
                      `⏸ Song is Pause by <@${message.author.id}>`
                    )
                  )
                  .then((msg) => {
                    msg.delete({
                      timeout: 5000,
                    });
                  });
              } else {
                queue.playing = !queue.playing;
                distube.resume(message);
                message.channel
                  .send(
                     new MessageEmbed()
                .setColor(ee.color).setDescription(
                      `▶ Resumed Song By <@${message.author.id}>`
                    )
                  )
                  .then((msg) => {
                    msg.delete({
                      timeout: 5000,
                    });
                  });
              }
              break;

            // decrease Volume
            case "🔉":
              reaction.users.remove(user).catch(console.error);
              if (queue.volume - 10 <= 0) queue.volume = 0;
              else queue.volume = queue.volume - 10;
              queue.connection.dispatcher.setVolumeLogarithmic(
                queue.volume / 100
              );
              queue.textChannel;
              message.channel
                .send(
                   new MessageEmbed()
                .setColor(ee.color).setDescription(
                    `🔉 Decreased The Volume, The Volume is Now ${queue.volume}%`
                  )
                )
                .then((msg) => {
                  msg.delete({
                    timeout: 5000,
                  });
                });
              break;

            // increase Volume
            case "🔊":
              reaction.users.remove(user).catch(console.error);
              if (queue.volume + 10 >= 1000) queue.volume = 100;
              else queue.volume = queue.volume + 10;
              queue.connection.dispatcher.setVolumeLogarithmic(
                queue.volume / 100
              );
              message.channel
                .send(
                   new MessageEmbed()
                .setColor(ee.color).setDescription(
                    `🔊 Increased The Volume, The Volume Is Now ${queue.volume}%`
                  )
                )
                .then((msg) => {
                  msg.delete({
                    timeout: 5000,
                  });
                });
              break;

            // Loop reaction
            case "🔁":
              reaction.users.remove(user).catch(console.error);
              queue.loop = !queue.loop;
              message.channel
                .send(
                   new MessageEmbed()
                .setColor(ee.color).setDescription(
                    `Loop is now ${queue.loop ? "**✅ on**" : "**❌ off**"}`
                  )
                )
                .then((msg) => {
                  msg.delete({
                    timeout: 5000,
                  });
                });
              break;

            // Stop reaction
            case "⏹":
              reaction.users.remove(user).catch(console.error);
              queue.songs = [];
              message.channel
                .send(
                   new MessageEmbed()
                .setColor(ee.color).setDescription(
                    `⏹ Music is Stopped by <@${message.author.id}>`
                  )
                )
                .then((msg) => {
                  msg.delete({
                    timeout: 5000,
                  });
                });
              try {
                queue.connection.dispatcher.end();
              } catch (error) {
                console.error(error);
                queue.connection.disconnect();
              }
              collector.stop();
              break;

            default:
              reaction.users.remove(user).catch(console.error);
              break;
          }
        });
        collector.on("end", () => {
          msg.reactions.removeAll();
          msg.delete({
            timeout: 10000,
          });
        });
      });
  });

  // add song
  distube.on("addSong", (message, queue, song) => {
    message.channel
      .send(
         new MessageEmbed()
                .setColor(ee.color)
          .setTitle("🎶 Added Song!")
          .setDescription(
            `Song: >>> [\`${song.name}\`](${song.url}) \n Duration 🎱 >>> \`${song.formattedDuration}\` \n Tracks >>> ${queue.songs.length}`
          )
          .setFooter(`Requested by: <@${message.author.id}>\n${status(queue)}}`)
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  });

  // add list
  distube.on("addList", (message, queue, playlist) => {
    message.channel
      .send(
         new MessageEmbed()
                .setColor(ee.color)
          .setTitle("🎶 Added List!")
          .setDescription(
            `List: >>> [\`${playlist.name}\`](${
              playlist.url
            }) \n Duration 🎱 >>> \`${
              playlist.formattedDuration
            }\` \n Tracks >>> ${playlist.songs.length} \n To Queue${status(
              queue
            )}`
          )
          .setFooter(`Requested by: ${message.author.tag}\n${status(queue)}}`)
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  });

  // add playlist
  distube.on("playList", (message, queue, playlist) => {
    message.channel
      .send(
         new MessageEmbed()
                .setColor(ee.color)
          .setTitle("🎶 Added PlayList!")
          .setDescription(
            `PlayList: >>> [\`${playlist.name}\`](${playlist.url}) \n Duration 🎱 >>> \`${playlist.formattedDuration}\` \n Tracks >>> ${playlist.songs.length} \n Added By ${playlist.user}`
          )
          .setFooter(`Requested by: ${message.author.tag}\n${status(queue)}}`)
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  });

  // search result
  distube.on("searchResult", (message, result) => {
    let i = 0;
    message.channel.send(
       new MessageEmbed()
                .setColor(ee.color)
        .setTitle(`Your Search Result >>> ${result.length}`)
        .addField(
          `**Choose an option from below**\n${result
            .map(
              (song) =>
                `**${++i}**. ${song.name} - \`${song.formattedDuration}\``
            )
            .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`,
          true
        )
        .setFooter(
          `Requested by: ${
            message.author.tag
          } , ${message.author.displayAvatarURL({ dynamic: true })}}}`
        )
    );
  });

  // search cancel
  distube.on("searchCancel", () => {
    message.channel
      .send( new MessageEmbed()
 .setColor(ee.color).setDescription(`Your Search Canceled`))
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  });
  distube.on("error", (message, e) => {
    message.channel
      .send( new MessageEmbed()
 .setColor(ee.color).setTitle(`This is Error`).setDescription(e))
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  });
  distube.on("initQueue", (queue) => {
    queue.autoplay = false;
    queue.volume = 75;
    queue.filter = "lowbass";
    queue.repeatMode = false;
  });

  distube.on("finish", (message) => {
    message.channel
      .send(
         new MessageEmbed()
                .setColor(ee.color).setDescription(
          `Song is Finished \n type ${prefix}play to Play a New Song`
        )
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  });

  distube.on("empty", (message) => {
    message.channel
      .send(
         new MessageEmbed()
                .setColor(ee.color).setDescription(
          `Nothing Playing \n i am in VC \nThanks to My Owner`
        )
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  });
};
