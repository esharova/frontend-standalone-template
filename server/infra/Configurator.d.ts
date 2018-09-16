import { ICallbackFunction } from 'nconf';

export interface IConfigurator {

    load(): Promise<IConfig>;

}

export interface IConfig {
    get(): object;

    get(key: string): string | number | object;

    any(keys: string[], callback?: ICallbackFunction): any;
}
