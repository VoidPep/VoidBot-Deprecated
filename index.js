import { InitClient } from './config/InitClient';
import { Register } from './config/Register';
(require('dotenv')).config();

export const client = InitClient();

client.on('ready', () => {
	client.user.setActivity('VoidBot', { type: 2 });
	client.user.setPresence({ status: 'online' });
	Register();
});

client.login(process.env.TOKEN);