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
        const queue = client.player.getQueue(interaction.guild);


        if (!queue) return await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("❌ Sem músicas na lista de reprodução")
                    .setColor(0x0099FF)
                    .setTimestamp()
                    .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}` }),
            ],
        });
        else if (trackNum > queue.tracks.length) {
            return await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription("❌ Posição da fila inválida")
                        .setColor("Red")
                        .setTimestamp()
                        .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}` }),
                ],
            });
        }
        const trackNum = interaction.options.getNumber("pos");
        const currentSong = queue.current;

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