export interface IApplicationConfiguration {
    api: IServerApiConfiguration;
}

export interface IServerApiConfiguration {
    headerURL: string;
    footerURL: string;
}
