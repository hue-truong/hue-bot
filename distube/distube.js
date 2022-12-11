const { DisTube } = require('distube');
const { Client, GatewayIntentBits, MessageActionRow, MessageButton } = require('discord.js');
const { SpotifyPlugin } = require("@distube/spotify");
const NUM_SEARCH = 5
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] })
const distube = new DisTube(client, {
    plugins: [new SpotifyPlugin()],
    searchSongs: NUM_SEARCH,
    searchCooldown: 30,
    leaveOnEmpty: false,
    leaveOnFinish: false,
    leaveOnStop: false,
});

// Queue status template
const status = queue => {
    `Volume: \`${queue.volume}%\` || 'Off'
        }\` | Loop: \`${queue.repeatMode
            ? queue.repeatMode === 2
                ? 'All Queue'
                : 'This Song'
            : 'Off'
        }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

};

// DisTube event listeners, more in the documentation page
distube
    .on('addSong', (queue, song) =>
        queue.textChannel?.send(
            `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
        ),
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel?.send(
            `Added \`${playlist.name}\` playlist (${playlist.songs.length
            } songs) to queue\n${status(queue)}`,
        ),
    )
    .on('error', (textChannel, e) => {
        console.error(e);
        textChannel.send(
            `An error encountered: ${e.message.slice(0, 2000)}`,
        );
    })
    .on('finish', queue => queue.textChannel?.send('Queue done!'))
    .on('empty', queue =>
        queue.textChannel?.send(
            'The voice channel is empty! Leaving the voice channel...',
        ),
    )
    // DisTubeOptions.searchSongs > 1
    .on('searchResult', (message, result) => {
        console.log('here')
        const row = new MessageActionRow()
        for (let i = 0; i < NUM_SEARCH; ++i) {
            row.addComponents(
                new MessageButton()
                    .setCustomId(`id${i+1}`)
                    .setLabel(`${i+1}`)
            )
        }

        message.channel.send({
            content: `**Choose an option from below**\n${result
                .map(
                    (song, i) =>
                        `**${++i}**. ${song.name} - \`${song.formattedDuration
                        }\``,
                )
                .join(
                    '\n',
                )}`,
            embeds: [row]
        });
    })
    .on('searchCancel', message =>
        message.channel.send('Searching canceled'),
    )
    .on('searchInvalidAnswer', message =>
        message.channel.send('Invalid number of result.'),
    )
    .on('searchNoResult', message =>
        message.channel.send('No result found!'),
    )
    .on('searchDone', () => { });

module.exports = {
    client: client,
    distube: distube
}