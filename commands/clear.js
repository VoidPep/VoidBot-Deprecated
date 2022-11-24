/* eslint-disable no-mixed-spaces-and-tabs *//* eslint-disable no-unused-vars */

const { SlashCommandBuilder } = require('@discordjs/builders');
/*

 module.exports = {
     name: 'clear',
     description: 'limpa mensagens do chat',
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
*/

  module.exports = {
  	data: new SlashCommandBuilder()
  		.setName('clear')
  		.setDescription('limpa mensagens do chat'),
  	async execute(interaction) {
 		// const quant = interaction.options.getInteger();
        // console.log(quant);
  	},
  };