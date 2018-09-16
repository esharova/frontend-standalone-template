import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core';
import { createTheme } from '../theme';

import hoc from '../rootPageConfigurator';
import Page from '../../../pages/index';

describe('test root page configurator hoc', () => {
    it('should render wrapped component', () => {
        const state = {
            config: {
                api: {

                },
            },
        };
        const store = configureStore()(state);

        const WrappedComponent = hoc(Page);

        const wrapper = mount(
            <Provider store={store}>
                <MuiThemeProvider theme={createTheme()}>
                    <WrappedComponent router={{ pathname: '/', route: '/' }} />
                </MuiThemeProvider>
            </Provider>,
        );

        expect(wrapper.html()).not.toBe(null);
    });
});