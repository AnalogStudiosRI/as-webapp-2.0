/*
 * Grunt related tasks for handling Javascript files
 */
'use strict';

var BowerService = require('../grunt-services/bower-service.js');

module.exports = function (grunt) {

  grunt.config.merge({
    clean: {
      dest: ['dest/*'],
      tmp: ['tmp/*']
    },

    //build
    copy: {
      assets: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['assets/**/**'],
          dest: 'dest/'
        }, {
          expand: true,
          cwd: 'src/pages',
          src: ['**/assets/**/**'],
          dest: 'dest/'
        }]
      },

      vendorDev: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: [BowerService.getAssets('dev').js, BowerService.getAssets('dev').css],
          dest: 'dest/assets/',
          rename: BowerService.renameAssets
        }]
      },

      vendorProd: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: [BowerService.getAssets('prod').js, BowerService.getAssets('prod').css],
          dest: 'dest/assets/',
          rename: BowerService.renameAssets
        }]
      },

      vendorFont: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: ['**/**/*.eot', '**/**/*.svg', '**/**/*.ttf', '**/**/*.woff'],
          dest: 'dest/assets/fonts/'
        }]
      },

      css: {
        files: [{
          expand: true,
          cwd: 'tmp/',
          src: ['**/*.css'],
          dest: 'dest/'
        }]
      },

      js: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['modules/**/*.js', '!**/**/*-test.js'],
          dest: 'dest/assets/js/'
        }, {
          expand: true,
          cwd: 'src/pages',
          src: ['**/*.js', '!**/*-test.js'],
          dest: 'dest/'
        }]
      },

      modules: {
        files: [{
          expand: true,
          cwd: 'src/modules',
          src: ['**/*.html'],
          dest: 'dest/modules'
        }]
      },

      pages: {
        files: [{
          expand: true,
          cwd: 'tmp/',
          src: ['**/*.html'],
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
          src: ['tmp/home/*.html'],
          dest: 'dest/',
          rename: function (dest) {
            return dest + '/index.html';
          }
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('copy:common', ['copy:assets', 'copy:modules', 'copy:pages', 'copy:vendorFont']);
};