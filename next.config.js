const withTypescript = require('@zeit/next-typescript');
const webpack = require('webpack');

module.exports = withTypescript({
        webpack(config, options) {
            config.plugins.push(new webpack.IgnorePlugin(/.*\.test\..*/));
            return config;
        }
    },
);
