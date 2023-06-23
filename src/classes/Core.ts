import { ActivityType, Client, Collection } from 'discord.js';
import Button from './Button';
import Command from './Command';
import Event from './Event';
import Handler from './Handler';
import Loader from './Loader';
import Logger from './Logger';
import Modal from './Modal';
import Select from './Select';

export default class YumuCore extends Client {
    commands = new Collection<string, Command>();
    selects = new Collection<string, Select>();
    buttons = new Collection<string, Button>();
    modals = new Collection<string, Modal>();
    events = new Collection<string, Event>();
    logger = new Logger('Discord');
    loader: Loader;

    constructor() {
        super({
            presence: {
                activities: [{ name: 'Booting...', type: ActivityType.Watching }],
                status: 'idle',
                afk: true
            },
            intents: ['Guilds']
        });
        new Handler(this);
        this.login(process.env.DISCORD_TOKEN)
            .then(() => {
                this.logger.log(`Successfully logged as ${this.user.username}`);
                this.loader = new Loader(this);
            })
            .catch(() => {
                this.logger.error('Invalid discord token');
                process.exit(1);
            });
    }
}
