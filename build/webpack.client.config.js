const webpack = require('webpack')
const base = require('./webpack.base.config')
const vueConfig = require('./vue-loader.config')
const browserSyncPlugin = require('browser-sync-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');

dotenv.load({ path: '.env' });

const config = Object.assign({}, base, {
  plugins: (base.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.SCS_API': JSON.stringify(process.env.SCS_API)
    }),
    new browserSyncPlugin({
      host: 'localhost',
      port: '4000',
      proxy: 'http://localhost:3000/'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'client-vendor-bundle.js'
    })
  ])
})

const ExtractTextPlugin = require('extract-text-webpack-plugin')

vueConfig.loaders = {
  stylus: ExtractTextPlugin.extract({
    loader: "css-loader!stylus-loader",
    fallbackLoader: "vue-style-loader"
  })
}

config.plugins.push(
  new ExtractTextPlugin('styles.css'),

  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
)

module.exports = config
