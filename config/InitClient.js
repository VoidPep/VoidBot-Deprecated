import { Player } from 'discord-player';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { readdirSync } from 'fs';

export function InitClient() {
	const client = new Client({
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.MessageContent,
			GatewayIntentBits.GuildVoiceStates,
		],
	});

	client.categories = readdirSync(`./commands/`);
	client.commands = new Collection();
	client.player = new Player(client, {
		ytdlOptions: {
			quality: "highestaudio",
			highWaterMark: 1 << 25,
		},
		initialVolume: 10,
		autoSelfDeaf: true,
	});
	return client;
}
