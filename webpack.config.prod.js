const commonConfig = require('./webpack.config.common');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = webpackMerge(commonConfig, {

  debug: false,
  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    new FaviconsWebpackPlugin({
      logo: './src/components/bootstrap/images/favicon.png',
      emitStats: true,
      prefix: 'icons/',
      statsFilename: 'icons/stats.json',
      inject: true,
      title: 'Analog Studios',
      background: '#efefef',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: true,
        windows: true
      }
    }),

    new WebpackMd5Hash(),
    new DedupePlugin(),

    new UglifyJsPlugin({
      beautify: false,
      mangle: { screw_ie8: true, keep_fnames: true }, // eslint-disable-line camelcase
      compress: { screw_ie8: true }, // eslint-disable-line camelcase
      comments: false
    })
  ],

  tslint: {
    emitErrors: true,
    failOnHint: true,
    resourcePath: 'src'
  },

  // Workaround Angular 2's html syntax => #id [bind] (event) *ngFor
  htmlLoader: {
    minimize: true,
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [
      [/#/, /(?:)/],
      [/\*/, /(?:)/],
      [/\[?\(?/, /(?:)/]
    ],
    customAttrAssign: [/\)?\]?=/]
  }

});