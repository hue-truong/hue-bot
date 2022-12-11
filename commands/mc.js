const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs')
const path = require('path')
const {NodeSSH} = require('node-ssh')
const { MC_HOST, MC_USER, MC_KEY_NAME, guildIds } = require('../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mc')
		.setDescription('Minecraft Server Interface')
        .addStringOption(o =>
            o.setName("command")
                .setDescription('A minecraft command')
                .setRequired(true)
        ),
	async execute(interaction) {
		if(interaction.options.getString('command') === "reboot"){
            if(interaction.guild.id === guildIds[0]){
                const ssh = new NodeSSH()
                await ssh.connect({
                    host: MC_HOST,
                    username: MC_USER,
                    privateKeyPath: `/home/ubuntu/discord-bot/env/${MC_KEY_NAME}`
                }).then(() => {
                    ssh.execCommand('sudo reboot').then(() => {
                        console.log("Here")
                        interaction.reply('Restarting Oracle Server!')
                        ssh.dispose()
                    })
                })
            }
            else{
                await interaction.reply('Cannot execute this command on this Discord server!')
            }
        }
        else{
            await interaction.reply('Uknown Minecraft command!')
        }
	},
};