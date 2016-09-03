const isProductionBuild = process.env.NODE_ENV === 'production';
const shouldWatch = !isProductionBuild;
const shouldSingleRun = isProductionBuild;
const browser = isProductionBuild ? 'PhantomJS' : 'Chrome';

module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
      {pattern: './node_modules/systemjs/dist/system.src.js', included: true, watched: false},
      {pattern: './node_modules/systemjs/dist/system-polyfills.js', included: true, watched: false},
      {pattern: './karma-test-shim.js', included: true, watched: false},
      {pattern: './src/**/**/*.ts', included: false, watched: shouldWatch}
    ],
    preprocessors: {
      './src/**/**/*.ts': ['typescript', 'coverage']
    },
    typescriptPreprocessor: {
      typings: [ './typings/index.d.ts' ]
    },
    reporters: ['progress', 'dots', 'junit', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
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