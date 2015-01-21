/*jshint node:true, es3: false */
'use strict';

var _ = require('lodash');
var getBowerAssets = require('./tasks/bower-assets.js').getBowerAssets;
var renameBowerAssets = require('./tasks/bower-assets.js').renameBowerAssets;

module.exports = function (grunt) {

  require('time-grunt')(grunt);

  //function getBowerAssets(env) {
  //  var toLoad = {};
  //  var globals = grunt.file.readJSON('src/globals.json');
  //  //grunt.log.writeln(globals);
  //
  //  globals = globals.bowerComponents[env];
  //  globals = _.map(globals, function (value) {
  //    return value;
  //  });
  //  globals = _.flatten(globals);
  //  globals = _.pluck(globals, 'src');
  //
  //  //grunt.log.writeln(globals);
  //
  //  globals = globals.map(function (path) {
  //    //grunt.log.writeln('JS path ->' + path);
  //    return path.replace(/^\/assets\/(css|js)\//, '');
  //  });
  //
  //  toLoad.css = globals.filter(function (path) {
  //    //grunt.log.writeln('CSS path ->' + path);
  //    return (/.+\.css$/).test(path);
  //  });
  //
  //  toLoad.js = globals.filter(function (path) {
  //    return (/.+\.js/).test(path);
  //  });
  //
  //  return toLoad;
  //}

  //function bowerAssetRename(dest, src) {
  //  var srcArray = src.split('/');
  //  var newSrc = 'dest/assets/';
  //
  //  //standardize filename, so .min files are just filename.js
  //  //and the directory structure is flattened for supporting AMD
  //  var filename = srcArray[srcArray.length - 1].replace('.min', '');
  //
  //  //grunt.log.writeln('filename => ' + filename);
  //  var ext = filename.split('.')[1];
  //
  //  newSrc += ext + '/vendor/' + filename;
  //  //grunt.log.writeln('final => ' + newSrc);
  //
  //  return newSrc;
  //}

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
          src: [ getBowerAssets('dev').js, getBowerAssets('dev').css ],
          dest: 'dest/assets/',
          rename: bowerAssetRename
        }]
      },

      vendorProd: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: [ getBowerAssets('prod').js, getBowerAssets('prod').css ],
          dest: 'dest/assets/',
          rename: bowerAssetRename
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
  require('./tasks/')(grunt);

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