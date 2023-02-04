const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pausa a musica atual'),
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
        queue.setPaused(true);
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("Musica pausada, use `/resume` para retornar")
                    .setColor(0x0099FF),
            ],
        });
    },
};