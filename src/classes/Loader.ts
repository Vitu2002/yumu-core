import { REST, Routes } from 'discord.js';
import YumuCore from './Core';

export default class Loader {
    Client: YumuCore;
    rest = new REST();

    constructor(Client: YumuCore) {
        this.Client = Client;
        this.rest.setToken(Client.token);
        this.load().then(size =>
            Client.logger.log(`Loaded ${size} commands as ${Client.user.username}`)
        );
        const guilds = Client.guilds.cache;

        if (!guilds.size) Client.logger.warn('Not found any server to load commands.');
        else {
            Client.logger.info(`Loading commands in ${guilds.size} servers`);
            let commands = 0;
            let size = 0;
            for (const [id] of guilds) {
                this.load(id).then(_size => {
                    commands = _size;
                    size++;
                });
            }
            Client.logger.log(
                `Loaded ${commands} commands as ${Client.user.username} for ${size} guilds.`
            );
        }
    }

    async load(guild?: string) {
        try {
            const commands = this.Client.commands.filter(
                ({ type }) => type === (guild ? 'guild' : 'global')
            );
            if (!commands.size) return 0;
            const { id } = this.Client.user;
            await this.rest.put(
                guild ? Routes.applicationGuildCommands(id, guild) : Routes.applicationCommands(id),
                { body: commands.map(({ data }) => data.toJSON()) }
            );
            return commands.size;
        } catch (err) {
            console.log(err);
            if (!guild) {
                this.Client.logger.error(`Can't load commands as ${this.Client.user.username}.`);
                this.Client.logger.error(err.message);
            }
        }
    }
}
