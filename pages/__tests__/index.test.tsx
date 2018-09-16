import { MuiThemeProvider, Typography } from '@material-ui/core';
import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createTheme } from '../../shared/utils/theme';
import Main from '../index';

describe('Micro service for rendering ...', () => {

    it('should render index page', () => {
        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        const wrapper = mount(
                <Provider store={store}>
                    <MuiThemeProvider theme={ createTheme() }>
                        <Main agent={{ isMobile: false }}/>
                    </MuiThemeProvider>
                </Provider>,
        );
        let applicationPage = wrapper.find(Typography);
        expect(applicationPage).toHaveLength(1);
    });
});
