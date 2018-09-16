import { mount } from 'enzyme';
import * as React from 'react';
import { fireAnketaReady } from '../../shared/action/navigation';
import ProgressOnTheRoom from '../../shared/components/needwait/progressOnTheRoom';
import WaitDescriptionTextRotator from '../../shared/components/needwait/waitDescriptionTextRotator';
import WaitTimer from '../../shared/components/needwait/waitTimer';
import { prepareWrapper } from '../../shared/utils/test-utils';
import NoDecisionPage from '../no_decision_page';

describe('No decision page test', () => {
    it('should contain appropriate elements', () => {
        const {wrapper} = prepareWrapper({},  <NoDecisionPage/>);
        const progress = wrapper.find(ProgressOnTheRoom).prop('currentProgress');
        expect(progress).toEqual(60);
        const timer = wrapper.find(WaitTimer).prop('estimatedTime');
        expect(timer).toEqual(0);
        const description = wrapper.find(WaitDescriptionTextRotator).prop('textForRotate');
        expect(description).toMatchObject( ['К сожалению, банки не успели вернуть решение.'] );
        const button =  wrapper.findWhere(e => {
            return (
                e.type() === undefined &&
                e.debug().match(
                    `Попробовать еще раз`,
                )
            );
        }).closest('Button');
        expect(button.prop('onClick')).toBeDefined();
        const divs = wrapper.find('div');
        const demotivation =  divs.findWhere(e => {
            return (
                e.type() === undefined &&
                e.debug().match(
                    `Если у Вас нет времени ждать, Вы можете вернуться в Личный кабинет в раздел Ипотека и посмотреть решение банков позже`,
                )
            );
        });
        console.log(divs.debug())
        expect(demotivation).toBeDefined();
    });

    it('should map fireAnketaReady action', () => {
        const {wrapper} = prepareWrapper({},  <NoDecisionPage/>);
        const fireAnketaReadyProp = wrapper.find('NoDecisionPageClass').prop('fireAnketaReady');
        expect(fireAnketaReadyProp).toBeDefined();
    });
});