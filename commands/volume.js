/* eslint-disable prefer-const */
/* eslint-disable no-empty */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent *//* eslint-disable no-empty-function *//* eslint-disable no-trailing-spaces *//* eslint-disable indent */
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Ajusta o volume do bot')
        .addIntegerOption(option =>
            option
                .setName('valor')
                .setDescription('Volume do bot')
                .setRequired(true)
                .setMinValue(0)
                .setMaxValue(100)),

    run: async ({ client, interaction }) => {
        let queue = client.player.getQueue(interaction.guildId);

        if (!queue) return await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("❌ Sem músicas na lista de reprodução")
                    .setColor(0x0099FF),
            ],
        });

        await interaction.deferReply();
        let embed = new EmbedBuilder()
            .setColor(0x0099FF);
        let args = interaction.options.getInteger('valor');


        queue.setVolume(args);
        embed
            .setColor('Blue')
            .setTitle('Volume ajustado')
            .setDescription(`🔊 Volume ajustado para: ${args}`);

        await interaction.editReply({
            embeds: [embed],
        });
    },
};