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

        const embed = new EmbedBuilder()
            .setColor(0x0099FF);

        const args = interaction.options.getInteger('args');

        if (args === 1) {
            if (args == 1) {
                console.log(queue.repeatMode);
                queue.setRepeatMode(1);
                embed
                    .setDescription('🔁 Loop ativado')
                    .setColor('Green')
                    .setTimestamp()
                    .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}` });
            }
            else
                if (args == 0) {
                    queue.setRepeatMode(0);
                    embed
                        .setDescription('🔁 Loop desativado')
                        .setColor('Red')
                        .setTimestamp()
                        .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}` });
                }
            await interaction.editReply({
                embeds: [embed],
            });
        }
    },
};