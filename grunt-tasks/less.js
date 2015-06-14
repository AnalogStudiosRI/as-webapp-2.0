/*
 * Grunt related tasks for working with LESS files
 */
'use strict';

module.exports = function (grunt) {

  var lessFiles = [{
    expand: true,
    cwd: 'src/pages',
    src: ['**/*.less'],
    dest: 'tmp/',
    ext: '.css'
  }, {
    src: [
      'src/less/<%= pkg.name %>.less',
      'src/modules/**/*.less'
    ],
    dest: 'dest/assets/css/<%= pkg.name %>.css'
  }];

  grunt.config.merge({
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ff 15', 'android 2.3']
      },
      // By not including a dest path, we tell Autoprefixer to update files in place
      files: {
        src: 'tmp/**/*.css'
      }
    },

    cssmin: {
      options: {
        processImport: false
      },
      files: {
        expand: true,
        cwd: 'tmp/',
        src: ['**/*.css'],
        dest: 'dest/'
      }
    },

    less: {
      dev: {
        files: lessFiles,
        options: {
          dumpLineNumbers: 'comments'
        }
      },
      build: {
        files: lessFiles
      }
    },

    lesslint: {
      options: {
        imports: [],
        csslint: {
          csslintrc: '.csslintrc'
        }
      },
      src: [
        'src/less/<%= pkg.name %>.less',
        'src/pages/**/*.less',
        'src/modules/**/*.less'
      ]
    }

  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-lesslint');

  grunt.registerTask('css:dev', ['lesslint', 'less:dev', 'autoprefixer', 'copy:css']); //generate css for dev task
  grunt.registerTask('css:build', ['lesslint', 'less:build', 'autoprefixer', 'cssmin']); //generate css for build task

};