var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dest'),
    publicPath: 'http://localhost:6789/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

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