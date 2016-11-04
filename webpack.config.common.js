//TODO get rid of helpers?
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor':    './src/vendor.ts',
    'main':      './src/main.ts'
  },

  resolve: {
    extensions: ['', '.ts', '.js', '.json'],
    root: __dirname + './src',
    modulesDirectories: ['node_modules'],
  },

  module: {
    preLoaders: [],

    loaders: [{
      test: /\.ts$/,
      loaders: [
        'awesome-typescript-loader',
        'angular2-template-loader',
        '@angularclass/hmr-loader'
      ],
      exclude: [/\.(spec|e2e)\.ts$/]
    }, {
      test: /\.scss$/,
      loader: "css-to-string-loader!css!sass"
    }, {
      test: /\.html$/,
      loader: 'html-loader',
      exclude: [__dirname + './src/index.html']
    }, {
      test: /\.(jpg|png|gif)$/,
      loader: 'file'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }]
  },

  plugins: [
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

    new ForkCheckerPlugin(),

    new webpack.optimize.OccurenceOrderPlugin(true),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    new CopyWebpackPlugin([{
      //TODO add using import?
      context: './node_modules/ckeditor/',
      from: '**/**',
      to: './assets/vendor/ckeditor/'
    }]),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),

  ],

  //TODO is this needed?
  node: {
    global: 'window',
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};