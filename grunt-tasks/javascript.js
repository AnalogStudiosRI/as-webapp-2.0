/*
 * Grunt related tasks for handling Javascript files
 */
'use strict';

module.exports = function (grunt) {

  grunt.config.merge({
    concat: {
      dist: {
        src: [
          'dest/assets/js/vendor/angular.js',
          'dest/assets/js/vendor/*.js',
          'dest/assets/js/services/config/config.js',
          'dest/assets/js/services/language/language.js',
          'dest/assets/js/services/**/*.js',
          'dest/assets/js/features/**/*.js',
          'dest/assets/js/services/as-bootstrap/as-bootstrap.js'
        ],
        dest: 'dest/assets/js/core.min.js'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      jsFiles: {
        src: [
          'src/pages/**/*.js',
          'src/features/**/*.js',
          'src/services/**/*.js',
          'tasks/*.js',
          'karma.conf.js'
          //'scaffolds/**/*.js'
        ]
      }
    },

    ngAnnotate: {
      build: {
        files: [{
          expand: true,
          cwd: 'src/pages',
          src: [ '**/*.js', '!**/*-test.js' ],
          dest: 'tmp/'
        }, {
          expand: true,
          cwd: 'src/',
          src: [
            'services/**/*.js',
            'features/**/*.js',
            '!services/**/*-test.js',
            '!features/**/*-test.js'
          ],
          dest: 'tmp/assets/js'
        }]
      }
    },

    uglify: {
      options: {}, //we will be using logLevels to manage output
      build: {
        files: [{
          expand: true,
          cwd: 'dest/',
          src: [
            '**/**/*.js',
            '!assets/js/vendor/ngui.js'
          ],
          dest: 'dest/'
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-annotate');

};