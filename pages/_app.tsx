import React from 'react';
import { AppComponentProps, Container } from 'next/app';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { IPageContext } from '../shared/utils/getPageContext';

import withReduxStore from '../shared/utils/rootPageConfigurator';
import { Provider } from 'react-redux';
import { Store } from 'redux';

export interface IThemedAppProps extends AppComponentProps {
    reduxStore: Store;
    pageContext: IPageContext;
    agent: ExpressUseragent.UserAgent;
}

class ThemedApp extends React.Component<IThemedAppProps, {}> {

    public static async getInitialProps({Component, ctx}) {
        if (Component.getInitialProps) {
            return await Component.getInitialProps(ctx);
        }
    }

    public componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    public render() {
        // tslint:disable-next-line:no-shadowed-variable
        const { Component, pageProps, reduxStore, pageContext, agent } = this.props;

        return (
            <Container>
                <Provider store={reduxStore}>
                {/* Wrap every page in Jss and Theme providers */}
                    <JssProvider
                        registry={pageContext.sheetsRegistry}
                        generateClassName={pageContext.generateClassName}
                    >
                        {/* MuiThemeProvider makes the theme available down the React
                  tree thanks to React context. */}
                        <MuiThemeProvider
                            theme={pageContext.theme}
                            sheetsManager={pageContext.sheetsManager}
                        >
                            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                            <CssBaseline />
                            {/* Pass pageContext to the _document though the renderPage enhancer
                    to render collected styles on server side. */}
                            <Component { ...{ ...pageProps, pageContext, agent, reduxStore } } />
                        </MuiThemeProvider>
                    </JssProvider>
                </Provider>
            </Container>
        );
    }
}

export default withReduxStore(ThemedApp);
