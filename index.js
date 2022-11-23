/* eslint-disable no-unused-vars */
/* eslint-disable indent *//* eslint-disable spaced-comment *//* eslint-disable quotes *//* eslint-disable brace-style *//* eslint-disable object-curly-spacing *//* eslint-disable no-trailing-spaces *//* eslint-disable space-before-function-paren *//* eslint-disable space-before-blocks *//* eslint-disable no-empty-function */
// ====================== constants ================================================
const { Client, Events, GatewayIntentBits, Collection, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv/config');
// ===================== dotenv configs ===============================================
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const PREFIX = process.env.PREFIX;
const commands = [];
// ====================== instantiators ===============================================
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,	GatewayIntentBits.MessageContent]});
const rest = new REST({ version: '10' }).setToken(TOKEN);
client.categories = fs.readdirSync(`./commands/`);
client.commands = new Collection();

// ===================== Loop for slash command files ======================================
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	client.commands.set(command.name, command);
}
// ===================== Loop for event files =========================================
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
// ========================== events =================================================

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	const args = message.content.slice(PREFIX.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'clear') {
		client.commands.get('clear').execute(message, args);
	}
});
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	const args = message.content.slice(PREFIX.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		client.commands.get('ping').execute(message);
	}
});

// ========================== start ==================================================
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(CLIENT_ID),
			{ body: commands },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
client.login(TOKEN);