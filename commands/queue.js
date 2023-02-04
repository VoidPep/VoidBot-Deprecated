const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Mostra as músicas na lista de reprodução')
        .addNumberOption((option) => option
            .setName('page')
            .setDescription('pagina da lista de reprodução')
            .setMinValue(1)),
    run: async ({ client, interaction }) => {
        await interaction.deferReply();
        const queue = client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) {
            const embedErr = new EmbedBuilder()
                .setColor(0x0099FF)
                .setDescription('Não há nenhuma música na lista de reprodução no momento :/');
            return await interaction.editReply({
                embeds: [embedErr],
            });
        }
        const totalPages = Math.ceil(queue.tracks.length / 10) || 1;
        const page = (interaction.options.getNumber("page") || 1) - 1;

        if (page > totalPages) {
            const embedErr = new EmbedBuilder()
                .setColor(0x0099FF)
                .setDescription(`Perdão. só exite um total de ${totalPages} páginas na lista de reprodução`);
            return await interaction.editReply({
                embeds: [embedErr],
            });
        }

        const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            return `**${page * 10 + i + 1}. \`[${song.duration}]\` ${song.title}`;
        }).join("\n");
        const currentSong = queue.current;

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`**Tocando agora**\n` + (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title}` : "None") + `**\n\nLista de reprodução**\n${queueString}`)
                    .setFooter({ text: `Página ${page + 1} de ${totalPages}` })
                    .setThumbnail(currentSong.setThumbnail)
                    .setColor(0x0099FF),
            ],
        });
    },
};