/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType, Playlist } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Toca suas músicas')
        .addStringOption((option) =>
            option.setName('musica')
                .setDescription('Nome/URL da música')
                .setRequired(true)),

    run: async ({ client, interaction }) => {
        await interaction.deferReply();
        const embed = new EmbedBuilder()
            .setColor(0x0099FF);
        if (!interaction.member.voice.channel) {
            const embedErr = new EmbedBuilder()
                .setColor(0x0099FF)
                .setDescription('❌ Você precisa entrar em um canal de voz para usar esse comando :/');
            return await interaction.editReply({
                embeds: [embedErr],
            });
        }
        let setDefaultVolume;
        let queue = await client.player.getQueue(interaction.guild);
        if (!queue) {
            queue = await client.player.createQueue(interaction.guild);
            setDefaultVolume = true;
        }

        const query = interaction.options.getString('musica');
        const linkParts = query.split("=");

        let ehPlaylist = false;
        let result;

        if (linkParts[0] === 'https://www.youtube.com/playlist?list') {
            try {
                result = await client.player.search(query, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_PLAYLIST,
                });
                if (!queue.connection) await queue.connect(interaction.member.voice.channel);
                ehPlaylist = true;
            } catch (error) {
                return interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(0xFF0000)
                            .setDescription("❌ Sem resultados, verifique se o link específicado corresponde aos motores de pesquisa."),
                    ],
                });
            }
        }
        if (query.match(/^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]{11}.*$/)) {
            try {
                result = await client.player.search(query, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO,
                });
                if (!queue.connection) await queue.connect(interaction.member.voice.channel);
            } catch (error) {
                return interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(0xFF0000)
                            .setDescription("❌ Sem resultados, verifique se o link específicado corresponde aos motores de pesquisa."),
                    ],
                });
            }
        }
        else if (query.match(/^https?:\/\/open\.spotify\.com\/.*$/)) {
            try {
                result = await client.player.search(query, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.SPOTIFY_SONG,
                });
                if (!queue.connection) await queue.connect(interaction.member.voice.channel);
            } catch (error) {
                return interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(0xFF0000)
                            .setDescription("❌ Sem resultados, verifique se o link específicado corresponde aos motores de pesquisa."),
                    ],
                });
            }
        }
        else {
            try {
                result = await client.player.search(query, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO,
                });
                if (!queue.connection) await queue.connect(interaction.member.voice.channel);
            } catch (error) {
                return interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(0xFF0000)
                            .setDescription("❌ Sem resultados, verifique se o link específicado corresponde aos motores de pesquisa."),
                    ],
                });
            }
            if (!result || !result.tracks.length) {
                return interaction.editReply({
                    embeds:
                        new EmbedBuilder()
                            .setColor(0x0099FF)
                            .setFooter({ text: "❌ Sem resultados, sua música não foi encontrada." }),
                });
            }
        }
        let song;
        if (result.length !== 0 || result) {
            if (!ehPlaylist) {
                song = result.tracks[0];
                await queue.addTrack(song);
                embed
                    .setDescription(`**[${song.title}](${song.url})**\n Foi adicionado à lista de reprodução`);
            }
            if (ehPlaylist) {
                song = result.tracks;
                await queue.addTracks(song);
                const playlist = result.playlist;
                await queue.addTracks(result.tracks);
                embed
                    .setDescription(`**${result.tracks.length} musicas em [${playlist.title}](${playlist.url})** \nFoi adicionado à lista de reprodução`);
            }
            embed
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duração: ${song.duration}` });
            if (!queue.playing) await queue.play();
        }

        if (setDefaultVolume) {
            queue.setVolume(10);
            setDefaultVolume = false;
        }

        await interaction.editReply({
            embeds: [embed],
        });
    },
};