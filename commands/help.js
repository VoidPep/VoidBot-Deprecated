const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Mostra a lista de comandos do bot'),

    run: async ({ interaction }) => {
        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Comandos');

        await interaction.editReply({
            embeds: [embed],
        });
    },
};