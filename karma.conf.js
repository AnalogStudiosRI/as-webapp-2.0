const isProductionBuild = process.env.NODE_ENV === 'production';
const shouldWatch = !isProductionBuild;
const shouldSingleRun = isProductionBuild;
const browser = isProductionBuild ? 'PhantomJS' : 'Chrome';
const tsConfig = require('./tsconfig.json');


module.exports = function (config) {
  let logLevel = isProductionBuild ? config.LOG_DEBUG : config.LOG_INFO;

  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: [
      {pattern: 'src/services/artists.service.spec.ts'}
    ],
    //TODO Use webpack ??
    preprocessors: {
      '**/**/*.ts': ['typescript']  //transpile TypeScript to ES5 and then resolve CommonJS / require
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