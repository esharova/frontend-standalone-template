import { applyMiddleware, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { rootReducer } from '../reducers/root-reducer';

export interface IApplicationState {

}

const defaultInitialState: IApplicationState = {
};

export function configureStore
        (initialState: IApplicationState = defaultInitialState, isServer: boolean = false): Store<IApplicationState> {

    const middlewares = [thunk];

    if (!isServer && process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger({}));
    }

    // @ts-ignore: *
    const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));
}
