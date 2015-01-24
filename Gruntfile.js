/*jshint node:true, es3: false */
'use strict';

var BowerService = require('./grunt-services/bower-service.js');

module.exports = function (grunt) {

  require('time-grunt')(grunt);

  //tasks + grunt config
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dest: [ 'dest/*' ],
      tmp: [ 'tmp/*' ]
    },

    //build
    copy: {
      assets: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [ 'assets/**/**' ],
          dest: 'dest/'
        }, {
          expand: true,
          cwd: 'src/pages',
          src: [ '**/assets/**/**' ],
          dest: 'dest/'
        }]
      },

      vendorDev: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: [ BowerService.getAssets('dev').js, BowerService.getAssets('dev').css ],
          dest: 'dest/assets/',
          rename: BowerService.renameAssets
        }]
      },

      vendorProd: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: [ BowerService.getAssets('prod').js, BowerService.getAssets('prod').css ],
          dest: 'dest/assets/',
          rename: BowerService.renameAssets
        }]
      },

      vendorFont: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: [ '**/**/*.eot', '**/**/*.svg', '**/**/*.ttf', '**/**/*.woff' ],
          dest: 'dest/assets/fonts/'
        }]
      },

      css: {
        files: [{
          expand: true,
          cwd: 'tmp/',
          src: [ '**/*.css' ],
          dest: 'dest/'
        }]
      },

      js: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [ 'services/**/*.js', 'features/**/*.js', '!services/**/*-test.js', '!features/**/*-test.js' ],
          dest: 'dest/assets/js/'
        }, {
          expand: true,
          cwd: 'src/pages',
          src: [ '**/*.js', '!**/*-test.js' ],
          dest: 'dest/'
        }]
      },

      features: {
        files: [{
          expand: true,
          cwd: 'src/features',
          src: [ '**/*.html' ],
          dest: 'dest/features'
        }]
      },

      pages: {
        files: [{
          expand: true,
          cwd: 'tmp/',
          src: [ '**/*.html' ],
          dest: 'dest/',
          rename: function (dest, src) {
            return dest + '/' + src.split('/')[0] + '/index.html';
          }
        }]
      },

      home: {
        files: [{
          expand: true,
          cwd: '.',
          src: [ 'tmp/home/*.html' ],
          dest: 'dest/',
          rename: function (dest) {
            return dest + '/index.html';
          }
        }]
      }
    }

  });

  //custom feature tasks
  grunt.loadTasks('./grunt-tasks');

  //contrib
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');


  //html
  grunt.registerTask('assemble:dev', [ 'assemble:siteDev', 'assemble:adminDev' ]);
  grunt.registerTask('assemble:prod', [ 'assemble:siteProd', 'assemble:adminProd', 'copy:home'  /*, 'validation'*/ ]);

  //css
  grunt.registerTask('css:dev', [ 'lesslint', 'less:dev', 'autoprefixer', 'copy:css' ]); //generate css for dev task
  grunt.registerTask('css:build', [ 'lesslint', 'less:build', 'autoprefixer', 'cssmin' ]); //generate css for build task

  //js
  grunt.registerTask('js:dev', [ 'jshint', 'copy:js' ]); //generate js for dev task
  grunt.registerTask('js:build', [ 'jshint', 'copy:js', 'ngAnnotate:build', 'uglify:build', 'concat:dist' ]); //generate js for build task

  //copy
  grunt.registerTask('copy:common', [ 'copy:assets', 'copy:features', 'copy:pages', 'copy:vendorFont' ]);

  //dev main
  grunt.registerTask('dev:core', [ 'clean', 'css:dev',  'js:dev', 'assemble:dev', 'copy:common', 'copy:vendorDev', 'clean:tmp' ]);

  //serve
  grunt.registerTask('serve:local', ['open:local', 'connect:local', 'watch']); //view the build locally, with as-api
  grunt.registerTask('serve:dev', ['open:local', 'connect:dev', 'watch']); //view the build locally against dev

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
    'validation',
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