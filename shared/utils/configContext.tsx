import { createContext } from 'react';
import { DEFAULT_DATATA_SUGGEST_URL, DEFAULT_FMS_ADAPTER_URL, DEFAULT_HH_SUGGEST_API_URL } from '../services/apiUrls';

const ConfigContext = createContext({
    dadataSuggestProxyBaseUrl: DEFAULT_DATATA_SUGGEST_URL,
    fmsAdapterBaseUrl: DEFAULT_FMS_ADAPTER_URL,
    hhSuggestApiBaseUrl: DEFAULT_HH_SUGGEST_API_URL,
});

export { ConfigContext };
