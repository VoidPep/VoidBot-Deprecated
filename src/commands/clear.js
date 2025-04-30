const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Limpa mensagens no canal atual')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addIntegerOption(option =>
            option
                .setName('quant')
                .setDescription('Quantidade de mensagens a ser deletada')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)),

    // eslint-disable-next-line no-unused-vars
    run: async ({ interaction, client }) => {
        const quant = interaction.options.getInteger('quant');
        const embed = new EmbedBuilder()
            .setAuthor({
                name: `${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setColor(0x0099FF)
            .setTimestamp(Date.now())
            .setDescription(`Mensagens apagadas: ${quant}`);

        await interaction.channel.messages.fetch({ limit: quant }).then(messages => {
            interaction.channel.bulkDelete(messages);
        });
        interaction.reply({
            embeds: [embed],
        });
    },
};