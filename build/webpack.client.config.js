const glob = require('glob')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const dotenv = require('dotenv');

dotenv.load({ path: '.env' });

const config = merge(base, {
  entry: {
    app: './src/client-entry.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.SCS_API': JSON.stringify(process.env.SCS_API),
      'process.env.VUE_ENV': '"client"'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          /node_modules/.test(module.context) &&
          !/\.css$/.test(module.request)
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.NormalModuleReplacementPlugin(
      /\/iconv-loader$/, 'node-noop',
    ),
    new VueSSRClientPlugin()
  ]
})

module.exports = config
