const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const utils = require('./utils')

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './src/client-entry.js',
    vendor: ['vue', 'vue-router', 'vuex', 'lru-cache', 'es6-promise', 'vue-multiselect']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'client-bundle.js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public'),
      'staticDB': path.resolve(__dirname, '../content/static_db.js')
    }
  },
  module: {
    noParse: /es6-promise\.js$/,
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  }
}
