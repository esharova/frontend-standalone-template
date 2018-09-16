import {NConfConfigurator} from "../NConfConfigurator";
import {IConfigurator} from "../Configurator";

const SAMPLE_USER = 'SAMPLE_USER';

describe('configuration management with nconf', () => {
    let nConfConfigurator: IConfigurator;

    beforeEach(() => {
        jest.resetModules();
        nConfConfigurator = new NConfConfigurator();
    });

    it('should return promise with config object', (done) => {
        process.env.SAMPLE_USER = SAMPLE_USER;

        nConfConfigurator.load()
            .then(conf => {
                expect(conf.get('SAMPLE:USER'))
                    .toBe(SAMPLE_USER);

                done();
            });
    });

    it('should load default environment as development', (done) => {
        delete process.env.NODE_ENV;

        nConfConfigurator.load()
            .then(conf => {
                expect(conf.get('NODE:ENV'))
                    .toBe('development');

                done();
            });
    });

    it('should override default environment by env var', (done) => {
        process.env.NODE_ENV = 'production';
        process.env.TESTX = 'TESTX';

        nConfConfigurator.load()
            .then(conf => {
                expect(conf.get('NODE:ENV'))
                    .toBe('production');

                expect(conf.get('TESTX'))
                    .toBe('TESTX');

                done();
            });
    });

    it('should load app id from default config', (done) => {
        nConfConfigurator.load()
            .then(conf => {
                expect(conf.get('app:id'))
                    .toBe('template-web-ui');

                done()
            });
    });

    it('should override properties by development config', (done) => {
        process.env.NODE_ENV = 'production';

        nConfConfigurator.load()
            .then(conf => {
                expect(conf.get('override_this:second'))
                    .toBeUndefined();

                expect(conf.get('override_this:first'))
                    .toBe('overridden-by-production');

                done()
            });
    });


    it('should return one of env var - first is existed', (done) => {
        process.env.CF_INSTANCE_PORT = '9808';
        process.env.NODE_PORT = '8080';

        nConfConfigurator.load()
            .then(conf => {
                expect(conf.any(['CF:INSTANCE:PORT', 'NODE:PORT']))
                    .toBe('9808');

                done()
            });
    });

    it('should return one of env var - last is existed', (done) => {
        process.env.NODE_PORT = '8080';

        nConfConfigurator.load()
            .then(conf => {
                expect(conf.any(['CF:INSTANCE:PORT', 'NODE:PORT']))
                    .toBe('8080');

                done()
            });
    });

    it('should set nested key by env var', done => {
        process.env['API_application-Backend-Endpoint'] = 'http://somehost';
        process.env.NODE_PORT = '8080';

        nConfConfigurator.load()
            .then(conf => {
                expect(conf.get('API:application-Backend-Endpoint'))
                    .toBe('http://somehost');

                done()
            });
    });

    afterEach(() => {
        delete process.env.CF_INSTANCE_PORT
        delete process.env.NODE_PORT
    });
});
