/* eslint-disable no-underscore-dangle */
import { GenerateClassName, SheetsRegistry } from 'jss';
import { createGenerateClassName, Theme } from '@material-ui/core/styles';
import { createTheme } from './theme';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createTheme();

export interface IPageContext {
    theme: Theme;
    sheetsManager: Map<any, any>;
    sheetsRegistry: SheetsRegistry;
    generateClassName: GenerateClassName<any>;
}

function createPageContext(): IPageContext {
    return {
        theme,
        // This is needed in order to deduplicate the injection of CSS in the page.
        sheetsManager: new Map(),
        // This is needed in order to inject the critical CSS.
        sheetsRegistry: new SheetsRegistry(),
        // The standard class name generator.
        generateClassName: createGenerateClassName(),
    };
}

const getPageContext = () => {
    // Make sure to create a new context for every server-side request so that data
    // isn't shared between connections (which would be bad).
    if (!process.browser) {
        return createPageContext();
    }

    // Reuse context on the client-side.
    if (!global.__INIT_MATERIAL_UI__) {
        global.__INIT_MATERIAL_UI__ = createPageContext();
    }

    return global.__INIT_MATERIAL_UI__;
};

export default getPageContext;

declare global {
    namespace NodeJS {
        // tslint:disable-next-line:interface-name
        interface Global {
            __INIT_MATERIAL_UI__: object;
        }

        // tslint:disable-next-line:interface-name
        interface Process {
            browser: object;
        }
    }
}
