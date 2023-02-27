const { Client, GatewayIntentBits, Collection, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Player } = require('discord-player');
const keepAlive = require('./server');
require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
	],
});
module.exports = client;
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
client.categories = fs.readdirSync(`/${process.cwd()}/commands/`);
client.commands = new Collection();
client.player = new Player(client, {
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25,
	},
	initialVolume: 10,
	smoothVolume: false,
	leaveOnStop: false,
	autoSelfDeaf: true,
	leaveOnEmptyCooldown: 60000,
	leaveOnEndCooldown: 60000,
});

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(`/${process.cwd()}/commands`).filter(file => file.endsWith('.js'));

client.on('ready', () => {
	client.user.setActivity('VoidBot', { type: 2 });
	client.user.setPresence({ status: 'online' });
});

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	client.commands.set(command.data.name, command);
	commands.push(command.data.toJSON());

}
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(`/${process.cwd()}/events`).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(process.env.IDCLIENT),
			{ body: commands },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {

		console.error(error);
	}
})();

client.login(process.env.TOKEN);
keepAlive();