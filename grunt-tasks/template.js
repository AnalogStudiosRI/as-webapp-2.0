/*
 * Grunt related tasks for templating (assemble / handlebars)
 */
'use strict';

module.exports = function (grunt) {

  function getConfigForSiteLayout(prodFlag) {
    return {
      options: {
        layout: 'site.hbs',
        production: prodFlag ? true : false
      },
      files: [{
        expand: true,
        cwd: 'src/pages/',
        src: ['**/*.html', '!admin/*.hbs'],
        dest: 'tmp/'
      }]
    };
  }

  function getConfigForAdminLayout(prodFlag) {
    return {
      options: {
        layout: 'admin.hbs',
        production: prodFlag ? true : false
      },
      files: [{
        expand: true,
        cwd: 'src/pages/',
        src: 'admin/*.hbs',
        dest: 'tmp/'
      }]
    };
  }

  grunt.config.merge({

    assemble: {
      options: {
        layoutdir: 'src/layouts',
        partials: ['src/partials/*.hbs'],
        data: ['package.json', 'src/pages/**/*.json', 'src/globals.json'],
        flatten: true
      },
      siteDev: getConfigForSiteLayout(),
      siteProd: getConfigForSiteLayout(true),
      adminDev: getConfigForAdminLayout(),
      adminProd: getConfigForAdminLayout(true)
    },

    /* jshint camelcase:false */
    // jscs:disable
    asset_cachebuster: {
      build: {
        options: {
          buster: '<%= pkg.version %>'
        },
        files: [{
          expand: true,
          cwd: 'dest',
          src: '**/*.css',
          rename: function (dest, src) {
            return 'dest/' + src;
          }
        }, {
          expand: true,
          cwd: 'dest',
          src: '**/*.html',
          rename: function (dest, src) {
            return 'dest/' + src;
          }
        }]
      }
    },
    // jscs:enable

    //html validation
    validation: {
      options: {
        reset: true,
        stoponerror: false,
        failHard: true,
        doctype: 'HTML5',
        reportpath: 'reports/validation-report.json',
        path: 'reports/validation-status.json',
        charset: 'utf-8',
        relaxerror: [
          'Section lacks heading. Consider using h2-h6 elements to add identifying headings to all sections.',
          'Element object is missing one or more of the following attributes: data, type.',
          'Element head is missing a required instance of child element title.'
        ]
      },
      files: {
        src: [
          'tmp/**/**/*.html',
          '!tmp/features/**/*'
        ]
      }
    }

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-asset-cachebuster');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('assemble:dev', ['assemble:siteDev', 'assemble:adminDev']);
  grunt.registerTask('assemble:prod', ['assemble:siteProd', 'assemble:adminProd', 'copy:home'/*, 'validation'*/]);

};