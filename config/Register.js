import { readdirSync } from 'fs';
import { join } from 'path/posix';
import { client } from '..';

export function Register() {
	RegisterCommands(commandFiles, commandsPath);
	RegisterEvents(eventFiles, eventsPath);
}

function RegisterCommands(commandFiles, commandsPath) {
	const commandsPath = join(`${__dirname}/..`, 'src/commands');
	const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = join(commandsPath, file);
		const command = require(filePath);

		client.commands.set(command.data.name, command);
	}
}
function RegisterEvents(eventFiles, eventsPath) {
	const eventsPath = join(`${__dirname}/..`, 'src/events');
	const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const filePath = join(eventsPath, file);
		const event = require(filePath);

		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
			continue;
		}

		client.on(event.name, (...args) => event.execute(...args));
	}
}
