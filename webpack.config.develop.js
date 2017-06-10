const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

module.exports = webpackMerge(commonConfig, {

  debug: true,
  devtool: 'cheap-module-source-map',

  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },

  devServer: {
    port: 6789,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: './build',
    proxy: {
      '/api/*': {
        target: 'http://analogstudios.thegreenhouse.io',
        secure: false,
        changeOrigin: true
      }
    }
  }

});