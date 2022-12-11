const { SlashCommandBuilder} = require('discord.js');
const { distube } = require('../distube/distube')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song!')
        .addStringOption(o =>
            o.setName("link-or-query")
                .setDescription('<Song name or YouTube URL>')
                .setRequired(true)
        ),
    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel
        if (voiceChannel) {
            let query = interaction.options.getString('link-or-query')
            // if(!(interaction.options.getString('link-or-query').includes('youtube.com') && interaction.options.getString('link-or-query').includes('spotify.com'))){
            //     await distube.search(query, {
            //         type: 'video',
            //         limit: 5,
            //     }).then(r => {
            //         console.log(r)
            //     });
            // }
            
			await distube.play(voiceChannel, query, { 
				interaction,
				textChannel: interaction.channel,
				member: interaction.member,
                searchSongs: 5
			});

            await interaction.reply('Ok!', ephemeral=true)
		} else {
			await interaction.reply(
				'You must join a voice channel first.',
			);
		}
    }
};


