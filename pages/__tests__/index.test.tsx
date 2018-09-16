import { MuiThemeProvider } from '@material-ui/core';
import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { PageLayout } from '../../shared/components/page-layout/page-layout';
import { createTheme } from '../../shared/utils/theme';
import Main from '../index';

describe('Micro service for rendering credit application', () => {

    it('On first visit first application page should be shown', () => {
        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({
            address: {},
            loanParameters: {
                completedPercent: 100,
            },
            navigation: {
                selectedBorrower: 0,
            },
            application: {
                applicationId: '',
            },
            borrowers: [
                {
                    navigation: {
                        currentSection: 'passport',
                        visitedSections: ['passport'],
                        leavedSections: ['passport'],
                    },
                    agreement: {
                        signatureAgreement: true,
                        commercialAgreement: true,
                        bkiAgreement: true,
                    },
                    passport: {
                        completedPercent: 100,
                    },
                    personalInformation: {
                        currentName:
                            {
                                firstName: 'Иван',
                                lastName: 'Израилевич',
                            },
                    },
                    mainEmployer: {
                        completedPercent: 100,
                    },
                    agreement: {

                    },
                    personalInformation: {
                        currentName:
                            {
                                firstName: 'Иван',
                                lastName: 'Израилевич',
                            },
                    },
                },
            ],
            loanParameters: {
                completedPercent: 100,
            },
            navigation: {
                selectedBorrower: 0,
            },
            config: {
                api: {},
                auth: {},
                user: {
                    id: '123',
                },
            },
        });

        const wrapper = mount(
                <Provider store={store}>
                    <MuiThemeProvider theme={ createTheme() }>
                        <Main agent={{ isMobile: false }}/>
                    </MuiThemeProvider>
                </Provider>,
        );
        let applicationPage = wrapper.find(PageLayout);
        expect(applicationPage).toHaveLength(1);
    });
});
