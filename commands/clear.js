/* eslint-disable indent */
module.exports = {
    name: 'clear',
    description: 'Clear messages!',
    async execute(message, args) {
        if (!args[0]) return message.reply('Quantas mensagens deseja apagar? (0 para nenhuma)');
        if (isNaN(args[0])) return message.reply('Por favor insira um numero válido 😜');

        if (args[0] > 100) return message.reply('Você não pode deletar mais de 100 mensagens');
        if (args[0] < 1) return message.reply('Nenhuma mensagem foi deletada');

        await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
            message.channel.bulkDelete(messages);
        });
    },
};