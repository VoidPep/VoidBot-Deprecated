/* eslint-disable prefer-const */
/* eslint-disable no-empty */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent *//* eslint-disable no-empty-function *//* eslint-disable no-trailing-spaces *//* eslint-disable indent */
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('alterna a repetição da queue')
        .addIntegerOption(option =>
            option
                .setName('args')
                .setDescription('1 para ativar o loop, 0 para desativar')
                .setRequired(true)
                .setMinValue(0)
                .setMaxValue(1)),
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

        let embed = new EmbedBuilder()
            .setColor(0x0099FF);

        let args = interaction.options.getInteger('args');

        if (interaction.options.getSubcommand() === 'loop') {
            if (args == 1) {
                queue.setRepeatMode(1);
                embed
                    .setDescription('🔁 Loop ativado')
                    .setColor('Green');
            }
            else
                if (args == 0) {
                    queue.setRepeatMode(0);
                    embed
                        .setDescription('🔁 Loop desativado')
                        .setColor('Red');
                }
            await interaction.editReply({
                embeds: [embed],
            });
        }
    },
};