import { IConfig, IConfigurator } from './Configurator';
import * as path from 'path';

const nconf = require('nconf');

interface IProps {
    defaultProperties?: object;
    requiredProperties?: Array<string>;
}

export class NConfConfigurator implements IConfigurator {
    private readonly config;
    private envLoadProperties = {
        lowerCase: false,
        separator: '_',
    };
    private defaultProperties;
    private requiredProperties;

    public constructor(options?: IProps) {
        const defaultOptions = !options ? {} : options;
        const {defaultProperties = {}, requiredProperties= []} = defaultOptions;
        this.config = nconf;
        const defaultPropertiesAssign = {
            NODE: {
                ENV: 'development',
            },
        };

        const requiredPropertiesAssign = [
            'NODE:ENV',
            'app:id',
        ];

        this.defaultProperties = Object.assign(defaultPropertiesAssign, defaultProperties);

        const set = new Set([...requiredPropertiesAssign, ...requiredProperties]);
        this.requiredProperties = [...set];
    }

    public load(): Promise<IConfig> {
        this.config.argv();
        this.config.env(this.envLoadProperties); // first load for resolve NODE_ENV and other bootstrap properties;

        this.config.defaults(this.defaultProperties);

        //Unicorns are here
        //TODO Use reliable config load li
        this.config.file('profile', path.resolve(process.cwd(), `config/${this.config.get('NODE:ENV')}.json`));
        this.config.file(path.resolve(process.cwd(), 'config/default.json'));

        //TODO add promise for load configurations from config-server
        return new Promise(resolve => {
            // << -- put external loading here
            this.config.load(() => {
                this.config.required(this.requiredProperties);
                resolve(this.config);
            });
        });

    }
}
