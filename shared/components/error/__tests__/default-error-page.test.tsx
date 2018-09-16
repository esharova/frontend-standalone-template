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

    it('should route to location if isFireAnketaReady false', () => {
        const REDIRECT_URI = 'https://google.com';
        const props = {
            allowRetry : true,
            isFireAnketaReadyNeeded: false,
            retryLocation: REDIRECT_URI,
        };
        const redirect = jest.fn();
        Router.push = redirect;
        const wrapper = mount(<DefaultErrorPage {...props}/>);
        const button = wrapper.find(Button);
        expect(button.text()).toEqual('Попробовать ещё раз');
        button.simulate('click');
        expect(redirect).toHaveBeenCalledWith(REDIRECT_URI);

    });

    it('should call handler if isFireAnketaReady true', () => {
        const handler = jest.fn();
        handler.mockImplementation(() => new Promise(() => {}));
        const props = {
            allowRetry : true,
            isFireAnketaReadyNeeded: true,
            actions: {
                fireAnketaReady: handler,
            },
        };
        const wrapper = mount(<DefaultErrorPage {...props}/>);
        const button = wrapper.find(Button);
        expect(button.text()).toEqual('Повторить запрос решения');
        button.simulate('click');
        expect(handler).toHaveBeenCalledTimes(1);

    });
});
