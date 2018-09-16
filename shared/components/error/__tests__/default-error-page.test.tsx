import { mount } from 'enzyme';
import * as React from 'react';
import { Button } from '@material-ui/core';
import Router from 'next/router';
import DefaultErrorPage from '../defaultErrorPage';

describe('default error page', () => {
    it('should render correctly with default properties', () => {
        const wrapper = mount(<DefaultErrorPage/>);
        const errorText = wrapper.findWhere(e => {
            return (e.type() === undefined && e.debug().match(
                `Мы не смогли завершить операцию из-за технической ошибки, но вы можете попробовать снова.`,
            ));
        }).parent();
        expect(errorText.length).toBeGreaterThan(0);
        expect(wrapper.find(Button).text()).toEqual('Попробовать ещё раз');
        expect(wrapper.find(Button).prop('onClick')).not.toBeUndefined();
    });
    it('should render correct text in different cases', () => {
        const props = {
            errorDescription: 'this props is ops',
            allowRetry : true,
        };
        const wrapper = mount(<DefaultErrorPage {...props}/>);
        const errorText = wrapper.findWhere(e => {
            return (e.type() === undefined && e.debug().match(`this props is ops`));
        }).parent();
        expect(errorText.length).toBeGreaterThan(0);
        expect(wrapper.find(Button).text()).toEqual('Попробовать ещё раз');
    });
    it('should render without retry button if retry is false', () => {
        const props = {
            allowRetry : false,
        };
        const wrapper = mount(<DefaultErrorPage {...props}/>);
        expect(wrapper.find(Button)).toHaveLength(0);
    });
});
