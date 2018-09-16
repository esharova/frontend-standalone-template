import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import ReactHtmlParser from 'react-html-parser';
import flush from 'styled-jsx/server';
import Axios from 'axios/index';
import { IncomingMessage } from 'http';
import { IApplicationConfiguration } from '../types/ApplicationConfiguration';

class SSRThemedDocument extends Document {
    public render() {
        const { cianFragments } = this.props;
        return (
            <html lang="en" dir="ltr">
            <Head>
                <title>Ипотечная анкета</title>
                <meta charSet="utf-8"/>
                {/* Use minimum-scale=1 to enable GPU rasterization */}
                <meta
                    name="viewport"
                    content={
                        'user-scalable=0, initial-scale=1, ' +
                        'minimum-scale=1, width=device-width, height=device-height'
                    }
                />
                {/* PWA primary color */}

                <link rel="stylesheet" href="//common-css.cian.site/common.min.css"/>
                <link rel="stylesheet" href="//common-css.cian.site/grid.min.css"/>
                <link rel="stylesheet" href="/_next/static/style.css" />
                <script src="//polyfills.cian.site/polyfills.min.js"/>
                <script
                    src="//cdn.cian.site/frontend/fonts/l/fonts.min.js"
                    data-fonts-public-path="//cdn.cian.site/frontend/fonts/"
                />
                <style jsx global>{'#__next { height: 100%; }'}</style>
                {ReactHtmlParser(cianFragments.header.headHTML)}
                {ReactHtmlParser(cianFragments.footer.headHTML)}
            </Head>
            <body>
            <div dangerouslySetInnerHTML={{__html: cianFragments.header.bodyHTML}}/>
            <Main/>
            <div dangerouslySetInnerHTML={{__html: cianFragments.footer.bodyHTML}}/>
            <NextScript/>
            </body>
            </html>
        );
    }
}

SSRThemedDocument.getInitialProps = async ctx => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    let footerFetchPromise = await resolveFooter(ctx.req, ctx.res.locals.config);
    let headerFetchPromise = await resolveHeader(ctx.req, ctx.res.locals.config);

    // Render app and page and get the context of the page with collected side effects.
    let pageContext;
    const page = ctx.renderPage(Component => {
        const WrappedComponent = props => {
            pageContext = props.pageContext;
            return <Component {...props} />;
        };

        return WrappedComponent;
    });

    return {
        ...page,
        cianFragments: {
            header: headerFetchPromise,
            footer: footerFetchPromise,
        },
        pageContext,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: (
            <React.Fragment>
                <style
                    id="jss-server-side"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{__html: pageContext.sheetsRegistry.toString()}}
                />
                {flush() || null}
            </React.Fragment>
        ),
    };
};

export default SSRThemedDocument;

const externalHeaderAndFooterStub = {
    bodyHTML: '<!-- oops. footer or header fragments are not available. -->',
    headHTML: '',
};

function extractHeaders(req: IncomingMessage) {
    const proxyHeaders = {};
    for ( let headerName in req.headers ) {
        if (headerName.toLocaleLowerCase().startsWith('x-')) {
            proxyHeaders[headerName] = req.headers[headerName];
        }
    }
    proxyHeaders['Cookie'] = req.headers['cookie'];
    return  proxyHeaders;
}

//TODO add caching
function resolveFooter(request: IncomingMessage, config: IApplicationConfiguration) {
    return Axios.get(config.api.footerURL + '/v1/get-footer-markup?style=adaptive', {
        headers: extractHeaders(request),
    }).then(headerResponse => {
        return headerResponse.data;
    }).catch(() => externalHeaderAndFooterStub);
}

//TODO add caching
function resolveHeader(request: IncomingMessage, config: IApplicationConfiguration) {
    return Axios.get(config.api.headerURL + '/v1/get-header-markup?style=adaptive', {
        headers: extractHeaders(request),
    }).then(headerResponse => {
        return headerResponse.data;
    }).catch(() => externalHeaderAndFooterStub);
}
