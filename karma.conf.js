const isProductionBuild = process.env.NODE_ENV === 'production';
const shouldWatch = !isProductionBuild;
const shouldSingleRun = isProductionBuild;
const browser = isProductionBuild ? 'PhantomJS' : 'Chrome';
const tsConfig = require('./tsconfig.json');



// RxJS
//import 'rxjs';

//ckeditor
//require('ckeditor');

module.exports = function (config) {
  //let logLevel = isProductionBuild ? config.LOG_DEBUG : config.LOG_INFO;

  config.set({
    basePath: './',
    frameworks: ['commonjs'],
    files: [
      {pattern: 'node_modules/systemjs/dist/system-polyfills.js', watched: false},
      {pattern: 'node_modules/systemjs/dist/system.js', watched: false},
      {pattern: 'node_modules/core-js/shim.js', watched: false},
      {pattern: 'node_modules/core-js/modules/*.js', watched: false},
      {pattern: 'node_modules/core-js/es6/*.js', watched: false},
      {pattern: 'node_modules/core-js/es7/reflect/*.js', watched: false},
      {pattern: 'node_modules/symbol-observable/lib/ponyfill.js', watched: false},
      {pattern: 'node_modules/symbol-observable/lib/index.js', watched: false},
      {pattern: 'node_modules/symbol-observable/index.js', watched: false},
      // {pattern: 'node_modules/rxjs/**/*.js', watched: false}

      // {pattern: 'node_modules/@angular/core/bundles/*.js'},
      // {pattern: 'node_modules/@angular/**/bundles/*.js'},
      // {pattern: 'node_modules/@angular/**/*.map.js'},
      // {pattern: 'node_modules/@angular/platform-browser/src/browser.js'},
      // {pattern: 'node_modules/@angular/platform-browser/index.js'},
      // {pattern: 'node_modules/@angular/platform-browser-dynamic/index.js'},
      // {pattern: 'node_modules/@angular/core/src/metadata.js'},
      // {pattern: 'node_modules/@angular/core/index.js'},
      // {pattern: 'node_modules/@angular/common/index.js'},
      // {pattern: 'node_modules/@angular/http/index.js'},
      // {pattern: 'node_modules/@angular/router/index.js'},

      //

      // {pattern: 'src/services/artists.service.ts'}
      // {pattern: 'src/services/artists.service.spec.ts'}
    ],
    //TODO Use webpack ??
    preprocessors: {
      '**/**/*.ts': ['typescript', 'commonjs'],  //transpile TypeScript to ES5 and then resolve CommonJS / require
      '**/**/*.js': ['commonjs']
    },
    typescriptPreprocessor: {
      //https://github.com/sergeyt/karma-typescript-preprocessor/issues/59#issuecomment-230496696
      options: {
        project: 'tsconfig.json'
      }
    },
    reporters: ['progress', 'dots', 'junit', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,  //logLevel
    autoWatch: true,
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
      type : 'cobertura',
      dir : './reports',
      subdir: 'coverage'
    }
  })

};