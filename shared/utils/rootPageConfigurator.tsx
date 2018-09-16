import React, { Component } from 'react';
import App from 'next/app';
import { Store } from 'redux';
import { configureStore, IApplicationState } from '../store/initialize-store';
import getPageContext from './getPageContext';
import { IThemedAppProps } from '../../pages/_app';
import { NextDocumentContext } from 'next/document';
import { Request, Response } from 'express-serve-static-core';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

export interface IDocumentContext extends NextDocumentContext {
    ctx: {
        reduxStore: Store;
        res: Response;
        req: Request;
    };
}

function getOrCreateStore(initialState: IApplicationState) {
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        // TODO: pass config to initialize store
        return configureStore(initialState, isServer);
    }

    // Create store if unavailable on the client and set it on the window object
    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = configureStore(initialState);
    }
    return window[__NEXT_REDUX_STORE__];
}

export default (WrappedComponent: Component<IThemedAppProps>) => {
    return class AppWithRedux extends App {

        private readonly reduxStore: Store;

        public static async getInitialProps(appContext: IDocumentContext) {
            const applicationState: IApplicationState = {};
            const reduxStore = getOrCreateStore(applicationState);

            // Provide the store to getInitialProps of pages
            appContext.ctx.reduxStore = reduxStore;

            let appProps = {};
            if (typeof WrappedComponent.getInitialProps === 'function') {
                appProps = await WrappedComponent.getInitialProps.call(App, appContext);
            }

            return {
                ...appProps,
                initialReduxState: reduxStore.getState(),
            };
        }

        public constructor(props) {
            super(props);
            this.reduxStore = getOrCreateStore(props.initialReduxState);
        }

        public render() {
            return React.createElement(WrappedComponent, {
                ...this.props,
                reduxStore: this.reduxStore,
                pageContext: getPageContext(),
            });
        }
    };
};
