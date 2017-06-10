const isProductionBuild = process.env.NODE_ENV === 'production';
const shouldWatch = !isProductionBuild;
const shouldSingleRun = isProductionBuild;
const browser = isProductionBuild ? 'PhantomJS' : 'Chrome';
const webpackConfig = require('./webpack.config.common');

// use this to allow spec.ts to be processed by Karma.
// better way to do this?
webpackConfig.module.loaders[0].exclude = [];

// known issue with karma and CommonChunksPlugin
// https://github.com/webpack/karma-webpack/issues/24
webpackConfig.plugins[0] = function() {};

module.exports = function(config) {
  const logLevel = isProductionBuild ? config.LOG_DEBUG : config.LOG_INFO;

  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: [
      // pull in PhantomJS polyfills
      // https://github.com/wallabyjs/public/issues/542
      { pattern: 'node_modules/reflect-metadata/Reflect.js', watched: false },
      { pattern: 'node_modules/babel-polyfill/browser.js', watched: false },
      { pattern: 'src/**/*.spec.ts', watched: false }
    ],

    preprocessors: {
      '**/*.spec.ts': ['webpack', 'coverage']
    },

    webpack: webpackConfig,

    reporters: ['progress', 'dots', 'junit', 'coverage'],
    port: 9876,
    logLevel: logLevel,
    autoWatch: shouldWatch,
    browsers: [browser],
    singleRun: shouldSingleRun,
    concurrency: Infinity,
    junitReporter: {
      outputDir: './reports/',
      outputFile: 'test-results.xml',
      suite: 'as-webapp',
      useBrowserName: false
    },
    coverageReporter: {
      type: 'cobertura',
      dir: './reports',
      subdir: 'coverage'
    }
  });

};