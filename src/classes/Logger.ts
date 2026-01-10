import dayjs from 'dayjs';
import { cyan, gray, green, magenta, red, yellow } from 'picocolors';

export default class Logger {
    identifier: string = 'Logger';

    constructor(identifier?: string) {
        if (identifier) this.identifier = identifier;
    }

    private readonly types = {
        log: cyan('LOG'),
        info: green('INFO'),
        warn: yellow('WARN'),
        error: red('ERROR')
    };

    private base(type: 'log' | 'warn' | 'error' | 'info', ident: string) {
        const now = dayjs().format('DD/MM/YYYY HH:mm:ss');
        const time = `${green(`[Yumu-Core]`)} ${now}`;
        return `${time}     ${this.types[type]} ${magenta(`[${ident}]`)}`;
    }

    log(message: string, identifier?: string) {
        const ident = identifier || this.identifier;
        return console.log(`${this.base('log', ident)} ${gray(`${message}`)}`);
    }

    info(message: string, identifier?: string) {
        const ident = identifier || this.identifier;
        return console.log(`${this.base('info', ident)} ${gray(`${message}`)}`);
    }

    error(message: string, identifier?: string) {
        const ident = identifier || this.identifier;
        return console.log(`${this.base('error', ident)} ${gray(`${message}`)}`);
    }

    warn(message: string, identifier?: string) {
        const ident = identifier || this.identifier;
        return console.log(`${this.base('warn', ident)} ${gray(`${message}`)}`);
    }

    start() {
        console.clear();
        const now = dayjs().format('DD/MM/YYYY HH:mm:ss');
        const time = `${green(`[Yumu-Core]`)} ${now}`;
        return console.log(`${time}     Starting system...\n`);
    }
}

const logger = new Logger('System');
export { logger };
