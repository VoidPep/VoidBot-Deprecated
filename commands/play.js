/* eslint-disable prefer-const */
/* eslint-disable no-empty */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent *//* eslint-disable no-empty-function *//* eslint-disable no-trailing-spaces *//* eslint-disable indent */
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Toca músicas diretamente do youtube')
        .addSubcommand((subcommand) =>
            subcommand.setName("music")
                .setDescription('Toca uma única singular música')
                .addStringOption((option) =>
                    option.setName('url')
                        .setDescription('url da música')
                        .setRequired(true)))
        .addSubcommand((subcommand) =>
            subcommand.setName('playlist')
                .setDescription('Toca a sua... playlist')
                .addStringOption((option) =>
                    option.setName('url')
                        .setDescription('url da playlist')
                        .setRequired(true)))
        .addSubcommand((subcommand) =>
            subcommand.setName('search')
                .setDescription('Pesquisa pelo nome da música')
                .addStringOption((option) =>
                    option.setName('name')
                        .setDescription('nome da música')
                        .setRequired(true)))
        .addSubcommand((subcommand) =>
            subcommand.setName('loop')
                .setDescription('alterna a repetição da queue')
                .addIntegerOption(option =>
                    option
                        .setName('args')
                        .setDescription('1 para ativar o loop, 0 para desativar')
                        .setRequired(true)
                        .setMinValue(0)
                        .setMaxValue(1))),
    run: async ({ client, interaction }) => {

        await interaction.deferReply();
        let embed = new EmbedBuilder()
            .setColor(0x0099FF);
        if (!interaction.member.voice.channel) {
            let embedErr = new EmbedBuilder()
                .setColor(0x0099FF)
                .setDescription('❌ Você precisa entrar em um canal de voz para usar esse comando :/');
            return await interaction.editReply({
                embeds: [embedErr],
            });
        }
        const queue = await client.player.createQueue(interaction.guild);
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);

        if (interaction.options.getSubcommand() === "music") {
            let url = interaction.options.getString("url");
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO,
            });
            if (result.length === 0)
                return interaction.editReply("❌ Sem resultados :/");

            const song = result.tracks[0];
            await queue.addTrack(song);
            embed
                .setDescription(`**[${song.title}](${song.url})**\n Foi adicionado à lista de reprodução`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duração: ${song.duration}` });


        } else if (interaction.options.getSubcommand() === 'playlist') {
            const url = interaction.options.getString("url");
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST,
            });
            if (result.length === 0)
                return interaction.editReply("❌ Sem resultados :/");

            const playlist = result.playlist;
            await queue.addTracks(result.tracks);
            embed
                .setDescription(`**${result.tracks.length} musicas em [${playlist.title}](${playlist.url})** \nFoi adicionado à lista de reprodução`);
        } else if (interaction.options.getSubcommand() === 'search') {
            const url = interaction.options.getString("name");
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            });
            if (result.length === 0)
                return interaction.editReply("❌ Sem resultados :/");

            const song = result.tracks[0];
            await queue.addTrack(song);

            embed
                .setDescription(`**[${song.title}](${song.url})**\n Foi adicionado à lista de reprodução`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duração: ${song.duration}` });
        }
        if (!queue.playing) await queue.play();

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