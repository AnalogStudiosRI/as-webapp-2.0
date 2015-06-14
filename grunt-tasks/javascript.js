/*
 * Grunt related tasks for handling Javascript files
 */
'use strict';

var jsFiles = [
  '*.js',
  'grunt-tasks/*.js',
  'src/**/**/*.js'
];

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
          'dest/assets/js/modules/**/*.js',
          'dest/assets/js/services/as-bootstrap/as-bootstrap.js'
        ],
        dest: 'dest/assets/js/core.min.js'
      }
    },

    jscs: {
      src: jsFiles,
      options: {
        config: '.jscsrc'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: './node_modules/jshint-stylish',
        verbose: true
      },
      jsFiles: {
        src: jsFiles
      }
    },

    ngAnnotate: {
      build: {
        files: [{
          expand: true,
          cwd: 'src/pages',
          src: ['**/*.js', '!**/*-test.js'],
          dest: 'tmp/'
        }, {
          expand: true,
          cwd: 'src/',
          src: [
            'services/**/*.js',
            'modules/**/*.js',
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
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.registerTask('js:dev', ['jshint', 'jscs', 'copy:js']); //generate js for dev task
  grunt.registerTask('js:build', ['jshint', 'jscs', 'copy:js', 'ngAnnotate:build', 'uglify:build', 'concat:dist']); //generate js for build task

};