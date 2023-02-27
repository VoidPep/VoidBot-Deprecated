const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
let loopEnabled = false;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Habilita ou desabilita o loop'),
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
        const embed = new EmbedBuilder()
            .setColor(0x0099FF);

        if (!loopEnabled) {
            queue.setRepeatMode(1);
            embed
                .setDescription('🔁 Loop ativado')
                .setColor('Green')
                .setTimestamp()
                .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}` });
            loopEnabled = !loopEnabled;
        } else if (loopEnabled) {
            queue.setRepeatMode(0);
            embed
                .setDescription('🔁 Loop desativado')
                .setColor('Red')
                .setTimestamp()
                .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}` });
            loopEnabled = !loopEnabled;
        }

        await interaction.editReply({
            embeds: [embed],
        });
    },
};