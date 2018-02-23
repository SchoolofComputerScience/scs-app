var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],

        files: [
            { pattern: './**/*.spec.js', watched: false },
        ],
        preprocessors: {
            './**/*.spec.js': ['webpack'],
        },
        reporters: ['progress'],
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_DISABLE,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity
    })
}
