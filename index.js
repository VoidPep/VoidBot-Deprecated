/* eslint-disable quotes */
/* eslint-disable brace-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable space-before-function-paren */
/* eslint-disable space-before-blocks */
/* eslint-disable no-empty-function */

const { Client, Events, GatewayIntentBits, Collection, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
require('dotenv/config');

// dotenv configs
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	] });
client.commands = new Collection();

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.once(Events.ClientReady, c => {
	console.log(`=================================================`);
	console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.on('messageCreate', async (message) => {
	console.log(message.content);
});
client.on('messageDelete', async (message) => {
	console.log(`Uma mensagem foi apagada por ${message.author.tag}\nconteúdo da mensagem:\n${message.content}`);
});
client.on('interactionCreate', async (interaction) => {
	if (interaction.isChatInputCommand()) {
		if (interaction.commandName === 'ping') {
			interaction.reply({ content: 'Pong.' });
		}
	} else { 
		return;
	}
});

async function main() {
	const commands = [
		{
			name: 'ping',
			description: 'replies with pong',
		},
	];
	
	try {
		console.log(`=================================================`);
		console.log('\nstarted refreshing aplication slash commands\n');
		await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
			body: commands,
		});
		client.login(TOKEN);
	} catch (err){
		console.log(err);
	}
}
main();
