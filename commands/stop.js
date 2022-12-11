const { SlashCommandBuilder } = require('discord.js');
const { distube } = require('../distube/distube')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the current song'),
    async execute(interaction) {
        await distube.stop(interaction.member.guild.id);
		await interaction.reply('Stopped!');
    },
};