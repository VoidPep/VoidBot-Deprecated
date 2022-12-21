/* eslint-disable brace-style */
const { Events } = require('discord.js');
const client = require('..');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);
		//console.log(command);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}
		await command.run({ client, interaction });

	},
};