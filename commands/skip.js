const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Pula para próxima música'),
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

        const currentSong = queue.current;

        queue.skip();

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${currentSong} foi pulada!`)
                    .setColor(0x0099FF),
            ],
        });
    },
};