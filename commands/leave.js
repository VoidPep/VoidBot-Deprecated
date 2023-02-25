const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Limpa a lista de reprodução e vai embora'),
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
        queue.destroy();
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("Adeus 👋")
                    .setColor(0x0099FF),
            ],
        });
    },
};