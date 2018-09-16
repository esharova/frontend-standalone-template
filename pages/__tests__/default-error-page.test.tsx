import DefaultErrorPage from '../../shared/components/error/defaultErrorPage';
import { prepareWrapper } from '../../shared/utils/test-utils';
import ErrorClass from '../default_error_page';

describe('default error page', () => {
    it('should map props from state and pass them to child componenn', () => {
        const stateInRedux = {
            resultError: {
                errorDescription: 'some description',
            },
        };
        const { wrapper } = prepareWrapper(stateInRedux, <ErrorClass/>);
        const defaultErrorPage = wrapper.find(DefaultErrorPage);
        expect(defaultErrorPage.prop('errorDescription')).toEqual('some description');
    });
});
