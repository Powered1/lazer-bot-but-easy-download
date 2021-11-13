const client = require("..");
const { Collection } = require('discord.js');
const voiceCollection = new Collection();

client.on('voiceStateUpdate', async (oldState, newState) => {
    const user = await client.users.fetch(newState.id);
    const member = newState.guild.member(user);

    const j2channel = newState.guild.channels.cache.find(ch => ch.name === "🔊｜ᴊᴏɪɴ-ᴛᴏ-ᴄʀᴇᴀᴛᴇ").id;

    if (!oldState.channel && newState.channel.id === j2channel) {
        const channel = await newState.guild.channels.create(user.username, {
            type: "voice",
            parent: newState.channel.parent,

        });

        member.voice.setChannel(channel);
        voiceCollection.set(user.id, channel.id);

    } else if (!newState.channel) {
        if (oldState.channelID === voiceCollection.get(newState.id)) return oldState.channel.delete();

    }
})