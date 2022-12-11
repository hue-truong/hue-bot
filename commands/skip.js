const { SlashCommandBuilder } = require('discord.js');
const { distube } = require('../distube/distube')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skips the current song'),
	async execute(interaction) {
		await distube.skip(interaction.member.guild.id)
		await interaction.reply('Ok!', ephemeral=true)
	},
};