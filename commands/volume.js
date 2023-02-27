const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Ajusta o volume do bot')
        .addIntegerOption(option =>
            option
                .setName('valor')
                .setDescription('Volume do bot em porcentagem')
                .setRequired(false)
                .setMinValue(0)
                .setMaxValue(100)),

    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId);
        await interaction.deferReply();
        const embed = new EmbedBuilder()
            .setColor('Blue');

        if (!queue) return await interaction.editReply({
            embeds: [embed
                .setDescription("❌ Sem músicas na lista de reprodução"),
            ],
        });
        if (interaction.options.getInteger('valor') == null) {
            embed
                .setTitle('Volume atual')
                .setDescription(`🔊 O volume atual da queue é: ${queue.volume * 10}%`);
        } else if (interaction.options.getInteger('valor')) {
            const args = interaction.options.getInteger('valor');
            queue.setVolume(args / 10);
            embed
                .setTitle('Volume ajustado')
                .setDescription(`🔊 Volume ajustado para: ${args}%`);
        } else {
            embed
                .setTitle("Erro")
                .setDescription(`Deu erro`);
            console.log(interaction);
        }

        await interaction.editReply({
            embeds: [embed],
        });
    },
};