console.log('webpack.dev.js');

var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('build'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  //TODO reload on CSS / LESS / HTLM file change
  devServer: {
    proxy:{
      '/api/*': {
        target: 'http://analogstudios.thegreenhouse.io',
        secure: false,
        changeOrigin: true
      }
    },
    historyApiFallback: true,
    stats: 'minimal'
  }
});