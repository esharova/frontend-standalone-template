import { mount } from 'enzyme';
import * as React from 'react';
import DoublePage from '../double';
import Button from '../../node_modules/@material-ui/core/Button/Button';

describe('Double page test', () => {
    it('should redirect to tinkoff site on button click', () => {
        const open = jest.fn();
        window.open = open;
        const wrapper = mount(<DoublePage/>);
        wrapper.find(Button).simulate('click');

        expect(open).toHaveBeenCalledTimes(1);
        expect(open).toHaveBeenCalledWith('https://www.tinkoff.ru/ipoteka/anketa');
    });
});
