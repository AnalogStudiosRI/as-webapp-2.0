/* jshint node: true */

'use strict';

var _ = require('lodash');

function getBowerAssets(env) {

  var toLoad = {};
  var globals = grunt.file.readJSON('src/globals.json');
  //grunt.log.writeln(globals);

  globals = globals.bowerComponents[env];
  globals = _.map(globals, function (value) {
    return value;
  });
  globals = _.flatten(globals);
  globals = _.pluck(globals, 'src');

  //grunt.log.writeln(globals);

  globals = globals.map(function (path) {
    //grunt.log.writeln('JS path ->' + path);
    return path.replace(/^\/assets\/(css|js)\//, '');
  });

  toLoad.css = globals.filter(function (path) {
    //grunt.log.writeln('CSS path ->' + path);
    return (/.+\.css$/).test(path);
  });

  toLoad.js = globals.filter(function (path) {
    return (/.+\.js/).test(path);
  });

  return toLoad;
}

function bowerAssetRename(dest, src) {
  var srcArray = src.split('/');
  var newSrc = 'dest/assets/';

  //standardize filename, so .min files are just filename.js
  //and the directory structure is flattened for supporting AMD
  var filename = srcArray[srcArray.length - 1].replace('.min', '');

  //grunt.log.writeln('filename => ' + filename);
  var ext = filename.split('.')[1];

  newSrc += ext + '/vendor/' + filename;
  //grunt.log.writeln('final => ' + newSrc);

  return newSrc;
}

exports = module.exports = getBowerAssets;
exports = module.exports = bowerAssetRename;