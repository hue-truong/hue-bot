const { SlashCommandBuilder } = require('discord.js');
const { distube } = require('../distube/distube')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resumes the current paused song'),
	async execute(interaction) {
		await distube.resume(interaction.member.guild.id)
		await interaction.reply('Ok!', ephemeral=true)
	},
};