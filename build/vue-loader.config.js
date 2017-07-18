module.exports = {
  extractCSS: process.env.NODE_ENV === 'production',
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ],
  options: {
    loaders: {
      scss: 'style-loader!css-loader!sass-loader'
    }
  }
}
