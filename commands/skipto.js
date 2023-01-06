/* eslint-disable prefer-const */
/* eslint-disable no-empty */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent *//* eslint-disable no-empty-function *//* eslint-disable no-trailing-spaces *//* eslint-disable indent */
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skipto')
        .setDescription('Pula para uma música da queue pelo seu número na track')
        .addNumberOption((option) =>
            option
                .setName('pos')
                .setDescription('posição da música na fila')
                .setMinValue(1)
                .setRequired(true)),
    run: async ({ client, interaction }) => {
        await interaction.deferReply();
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue) return await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("❌ Sem músicas na lista de reprodução")
                    .setColor(0x0099FF),
            ],
        });

        const trackNum = interaction.options.getNumber("pos");
        const currentSong = queue.current;

        if (trackNum > queue.tracks.length) {
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription("❌ Posição da fila inválida")
                        .setColor("Red"),
                ],
            });
        }

        queue.skipTo(trackNum - 1);

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${currentSong} foi pulada para música de numero ${trackNum}`)
                    .setColor(0x0099FF),
            ],
        });
    },
};