const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Mostra a lista de comandos do bot'),

    run: async ({ interaction }) => {
        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Comandos')
            .setDescription('**Geral**')
            .addFields(
                { name: `\`/help\``, value: 'Mostra esta mensagem\n' },
                { name: `\`/ping (adm)\``, value: 'Testa o tempo de resposta do client\n' },
                { name: `\`/clear\``, value: 'Limpa X mensagens do chat\n' },
                { name: '\u200B', value: '**Comandos de música**' },
                { name: `\`/play\``, value: `Toca suas músicas a partir de URL ou título \n \`obs: links de playlists do spotify não funcionam\`\n` },
                { name: `\`/loop\``, value: 'Habilita ou desabilita o loop\n' },
                { name: `\`/pause\``, value: 'Pausa a música atual\n' },
                { name: `\`/queue [pagina]\``, value: 'Mostra a lista de reprodução atual\n' },
                { name: `\`/skip\``, value: 'Pula para próxima música na lista de reprodução\n' },
                { name: `\`/skipto\``, value: 'Pula para uma música da queue pelo seu índice na lista\n' },
                { name: `\`/volume [%]\``, value: 'Mostra o volume atual || Altera o volume\n' },
            );

        await interaction.editReply({
            embeds: [embed],
        });
    },
};