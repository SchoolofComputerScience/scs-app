const merge = require('webpack-merge')
const base = require('./webpack.base.config')
var path = require('path')

const config = merge(base, {
    resolve: {
        alias: {
            '@views': path.resolve(__dirname, '../src/views'),
            '@components': path.resolve(__dirname, '../src/components')
        },
        extensions: [ '.js', '.json', '.vue' ]
    },
    resolveLoader: {
        alias: {
            'scss-loader': 'sass-loader'
        }
    }
})

module.exports = config