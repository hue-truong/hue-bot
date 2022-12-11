const { SlashCommandBuilder } = require('discord.js');
const { distube } = require('../distube/distube')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pauses the queue!'),
	async execute(interaction) {
		await distube.pause(interaction.member.guild.id)
		await interaction.reply('Ok!', ephemeral=true)
	},
};