/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                        'src', // 'dist',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'moment':                     'node_modules/moment',
    'ng2-bootstrap':              'node_modules/ng2-bootstrap',  //aded by me
    'rxjs':                       'node_modules/rxjs',
    'symbol-observable':          'node_modules/symbol-observable',  //aded by me
    'angular2-localstorage':      'node_modules/angular2-localstorage'  //aded by me
    //'angular2-jwt':               'node_modules/angular2-jwt'  //aded by me
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    '@angular/router':            { main: 'index.js', defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    'ng2-bootstrap':              { main: 'ng2-bootstrap.js', defaultExtension: 'js' },  //aded by me
    'moment':                     { main: 'moment.js', defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'symbol-observable':          { main: 'index.js', defaultExtension: 'js' },  //aded by me
    'angular2-localstorage':      { main: 'index.js', defaultExtension: 'js' }  //aded by me
    //'angular2-jwt':               { main: 'index.js', defaultExtension: 'js' }  //aded by me
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'upgrade'
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  // TODO added by me, setting to true manually
  var setPackageConfig = true ? packIndex : packUmd;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };

  System.config(config);

})(this);