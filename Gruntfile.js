/*jshint node:true, es3: false */
'use strict';

module.exports = function (grunt) {

  require('time-grunt')(grunt);

  //tasks + grunt config
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json')

  });

  //custom feature tasks
  grunt.loadTasks('./grunt-tasks');

  //dev main
  grunt.registerTask('dev:core', ['clean', 'css:dev',  'js:dev', 'assemble:dev', 'copy:common', 'copy:vendorDev', 'clean:tmp']);

  //development tasks
  grunt.registerTask('dev', [
    'dev:core',
    'serve:dev'
  ]);

  grunt.registerTask('dev:local', [
    'dev:core',
    'serve:local'
  ]);

  //build
  grunt.registerTask('build', [
    'clean',
    'karma:ci',
    'copy:vendorProd',
    'css:build',
    'js:build',
    'assemble:prod',
    //'validation',
    'asset_cachebuster',
    'copy:common',
    'clean:tmp'
  ]);

  //build + serve
  grunt.registerTask('show:build', [
    'clean',
    'copy:vendorProd',
    'css:build',
    'js:build',
    'assemble:prod',
    'asset_cachebuster',
    'copy:common',
    'clean:tmp',
    'serve:dev'
  ]);

};