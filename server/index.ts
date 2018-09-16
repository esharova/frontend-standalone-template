/// <reference types="node" />
import { parse } from 'url';
import * as next from 'next';
import * as express from 'express';
import * as useragent from 'express-useragent';
import * as cookieParser from 'cookie-parser';
import { NConfConfigurator } from './infra/NConfConfigurator';
import * as bodyParser from 'body-parser';
import { IApplicationConfiguration } from '../types/ApplicationConfiguration';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next(extractServerOptions(dev));
const handle = app.getRequestHandler();
const server = express();

const configurator = new NConfConfigurator({
    requiredProperties: [],
});

configurator.load()
    .then(configWrapper => configWrapper.get() as IApplicationConfiguration)
    .then((config: IApplicationConfiguration) => {

        app.prepare()
            .then(() => {
                server.use(cookieParser());
                server.use(useragent.express());
                server.use(bodyParser.json());
                server.get('*', (req, res) => {
                    const parsedUrl = parse(req.url, true);
                    res.locals.config = config;

                    return handle(req, res, parsedUrl);
                });

                server.listen(port, (err) => {
                    if (err) {
                        throw err;
                    }

                    // noinspection TsLint
                    console.log(`> Ready on http://localhost:${port}`);
                });
            });
    });

function extractServerOptions(isDev: boolean): next.ServerOptions {
    if (isDev) {
        console.log(`use development mode [isDev:${dev}]`);
        return {dev};
    }

    console.log(`use production mode [isDev:${dev}]`);
    return {
        conf: {
            distDir: process.env.NEXT_WORKDIR || '.next',
        },
        dev,
    };
}

export default server;
