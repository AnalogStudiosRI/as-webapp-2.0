/* jshint node: true */
'use strict';

var _ = require('lodash');
var url = require('url');
var proxy = require('proxy-middleware');

function forwardProxy(routes) {
  return _.map(routes, function (val, key) {
    var opts = _.isString(val) ? url.parse(val) : val;
    opts.route = key;

    return proxy(opts);
  });
}

exports = module.exports = forwardProxy;

//var ForwardProxy = function () {
//  var _ = require('lodash');
//  var url = require('url');
//  var proxy = require('proxy-middleware');
//
//  return {
//    getProxyConfig: function (routes) {
//      _.map(routes, function (val, key) {
//        var opts = _.isString(val) ? url.parse(val) : val;
//        opts.route = key;
//
//        return proxy(opts);
//      });
//    }
//  }
//
//}();
//
//exports = module.exports = ForwardProxy;
