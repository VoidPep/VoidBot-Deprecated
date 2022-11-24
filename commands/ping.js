/* eslint-disable indent *//* eslint-disable no-empty-function *//* eslint-disable no-trailing-spaces *//* eslint-disable indent */
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Responde com pong!'),
	async execute(interaction) {
		await interaction.reply('Pong 🏓');
	},
};