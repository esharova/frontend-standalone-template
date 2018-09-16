import * as React from 'react';
import { LogoDrawer } from '../../shared/components/approved/LogoDrawer';
import ApprovedPage from '../_approved';
import { mount } from 'enzyme';
import { BankNames } from '../../shared/logo/banks';
import { prepareWrapper } from '../../shared/utils/test-utils';

describe('HOC approved page', () => {
    const FULL_BANKS_LIST = [
        {
            code: 'DC',
            name: 'Дельта Кредит',
            bankName: BankNames.DELTA,
        },
        {
            code: 'GPB',
            name: 'Газпромбанк',
            bankName: BankNames.GAZPROM,
        },
        {
            code: 'ABS',
            name: 'Абсолют банк',
            bankName: BankNames.ABSOLUT,
        },
        {
            code: 'URS',
            name: 'Уралсиб',
            bankName: BankNames.URALSIB,
        },
        {
            code: 'AIJK',
            name: 'Дом РФ',
            bankName: BankNames.DOMRF,
        },
        {
            code: 'UCB',
            name: 'Юникредит банк',
            bankName: BankNames.UNICREDIT,
        },
        {
            code: 'AKB',
            name: 'АкБарс',
            bankName: BankNames.AKBARS,
        },
        {
            code: 'SMP',
            name: 'СМП банк',
            bankName: BankNames.SMP,
        },
        {
            code: 'MIB',
            name: 'Металинвест',
            bankName: BankNames.METALLINVEST,
        },
        {
            code: 'BGF',
            name: 'ЖилФинанс',
            bankName: BankNames.BZF,
        },
        {
            code: 'VEB',
            name: 'Восточный банк',
            bankName: BankNames.EASTERN,
        },
    ];
    it('should show correct text for approval from 1 bank', () => {
        const stateInRedux = {
            decision: {
                tinkoff: {
                    approveBanks: [
                        {
                            code: 'DC',
                            name: 'Дельта Кредит',
                        },
                    ],
                    loginUrl: 'http://tinkoff.ru',
                },
            },
        };
        const {wrapper} = prepareWrapper(stateInRedux,  <ApprovedPage/>);

        const found = wrapper.findWhere(e => {
            return (e.type() === undefined && e.debug().match(`Для вас сформировано предложение от 1 банка`));
        }).parent();

        expect(found.length).toBeGreaterThan(0);
    });

    it('should filter unknown banks', () => {
        const stateInRedux = {
            decision: {
                tinkoff: {
                    approveBanks: [
                        {
                            code: 'NO_NAME_BANK',
                            name: 'NO_NAME_BANK',
                        },
                    ],
                    loginUrl: 'http://tinkoff.ru',
                },
            },
        };
        const {wrapper} = prepareWrapper(stateInRedux,  <ApprovedPage/>);

        const found = wrapper.findWhere(e => {
            return (e.type() === undefined && e.debug().match(`Для вас сформированы предложения от банков`));
        }).parent();

        expect(found.length).toBeGreaterThan(0);
    });
    it('should show correct text for approval from 8 banks', () => {
        const stateInRedux = {
            decision: {
                tinkoff: {
                    approveBanks: [
                        {
                            code: 'DLT',
                            name: 'Дельта Кредит',
                            bankName: BankNames.DELTA,
                        },
                        {
                            code: 'GZP',
                            name: 'Газпромбанк',
                            bankName: BankNames.GAZPROM,
                        },
                        {
                            code: 'ABS',
                            name: 'Абсолют банк',
                            bankName: BankNames.ABSOLUT,
                        },
                        {
                            code: 'URL',
                            name: 'Уралсиб',
                            bankName: BankNames.URALSIB,
                        },
                        {
                            code: 'DRF',
                            name: 'Дом РФ',
                            bankName: BankNames.DOMRF,
                        },
                        {
                            code: 'UNI',
                            name: 'Юникредит банк',
                            bankName: BankNames.UNICREDIT,
                        },
                        {
                            code: 'AKB',
                            name: 'АкБарс',
                            bankName: BankNames.AKBARS,
                        },
                        {
                            code: 'SMP',
                            name: 'СМП банк',
                            bankName: BankNames.SMP,
                        },
                        {
                            code: 'MET',
                            name: 'Металинвест',
                            bankName: BankNames.METALLINVEST,
                        },
                        {
                            code: 'BZF',
                            name: 'ЖилФинанс',
                            bankName: BankNames.BZF,
                        },
                        {
                            code: 'EAST',
                            name: 'Восточный банк',
                            bankName: BankNames.EASTERN,
                        },
                    ],
                },
            },
        };

        const {wrapper} = prepareWrapper(stateInRedux, <ApprovedPage/>);

        const found = wrapper.findWhere(e => {
            return (
                e.type() === undefined &&
                e.debug().match(
                    `Для вас сформированы предложения от ${stateInRedux.decision.tinkoff.approveBanks.length} банков`,
                )
            );
        }).parent();

        expect(found.length).toBeGreaterThan(0);
    });
    it('should map bank names correctly', () => {

        const wrapper = mount(<LogoDrawer
            banks={FULL_BANKS_LIST}
            lkLink={'http://tinkoff.ru'}
        />);

        const banks = wrapper.find(LogoDrawer);

        expect(banks).toHaveLength(1);
    });
});
