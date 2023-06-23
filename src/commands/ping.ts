import Command from '@class/Command';
import YumuCore from '@core';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export default class PingCommand implements Command {
    type: 'global' = 'global';
    name = 'ping';
    run = (Client: YumuCore, interaction: ChatInputCommandInteraction) => {
        return interaction.reply(`> :ping_pong: | **Pong!** \`(${Client.ws.ping}ms)\``);
    };
    data = new SlashCommandBuilder().setName('ping').setDescription('Get bot ping');
}
