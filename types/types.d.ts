export interface IUser {
    id?: string | string[];
}

export interface IApplicationConfiguration {
    auth: IServerAuthConfiguration;
    api: IServerApiConfiguration;
    user?: IUser;
}

export interface IServerAuthConfiguration {
    userIdHeaderName: string;
    userIdQueryParamName: string;
    defaultRedirectUrl: string;
}

export interface IServerApiConfiguration {
    applicationBackendEndpoint: string;
    lkSearcherEndpoint: string;
    profileApiBaseUrl: string;
    profileApiXkey: string;
    dadataBackendEndpoint: string;
    fmsAdapterBaseUrl: string;
    hhSuggestApiBaseUrl: string;
    purchasePlacesApiEndpoint: string;
    headerURL: string;
    footerURL: string;
}
