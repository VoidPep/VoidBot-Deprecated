/* eslint-disable prefer-const */
/* eslint-disable no-empty */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent *//* eslint-disable no-empty-function *//* eslint-disable no-trailing-spaces *//* eslint-disable indent */
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Mostra a lista de comandos do bot'),

    run: async ({ interaction }) => {
        await interaction.deferReply();

        let embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Comandos');

        await interaction.editReply({
            embeds: [embed],
        });
    },
};