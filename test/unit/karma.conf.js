var webpackConfig = require('../../build/webpack.test.conf');

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],

        files: [
            { pattern: './**/*.spec.js', watched: false },
        ],
        preprocessors: {
            './**/*.spec.js': ['webpack'],
        },
        reporters: ['progress','kjhtml'],
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        webpackServer: {
            noInfo: true
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity
    });
}
