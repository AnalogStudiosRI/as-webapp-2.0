'use strict';

module.exports = function (config) {

  var conf = require('./karma.conf')(config);

  conf.reporters.push('coverage');

  conf.coverageReporter = {
    dir: 'reports/test-coverage/',
    subdir: function (browser) {
      // normalization process to keep a consistent browser name across different OS
      return browser.toLowerCase().split(/[ /-]/)[0];
    },
    reporters: [
      { type: 'html', file: 'coverage.html' },
      { type: 'cobertura', file: 'coverage.xml'},
      { type: 'text-summary'}
    ]
  };

  config.set(conf);

  return conf;
};