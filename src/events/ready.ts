import Event from '@class/Event';
import YumuCore from '@core';
import { ActivityType } from 'discord.js';

export default class Ready implements Event {
    name = 'ready';
    run = (Client: YumuCore) => {
        Client.user.setPresence({
            activities: [{ name: 'YumuCore', type: ActivityType.Listening }],
            status: 'online',
            afk: false
        });
    };
}
