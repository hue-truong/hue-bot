const { SlashCommandBuilder } = require('discord.js');
const { distube } = require('../distube/distube')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Get the current song queue'),
    async execute(interaction) {
		const queue = distube.getQueue(interaction.guild);
		if (!queue) {
			await interaction.reply('Nothing playing right now!');
		} else {
			await interaction.reply(
				`Current queue:\n${queue.songs
					.map(
						(song, id) =>
							`**${id ? id : 'Playing'}**. ${
								song.name
							} - \`${song.formattedDuration}\``,
					)
					.slice(0, 10)
					.join('\n')}`,
			);
		}
    },
};