/* jshint node: true */
'use strict';

var ForwardProxy = function (lodash, url, proxy) {

  return {
    getProxy: function (routes) {
      return lodash.map(routes, function (val, key) {
        var opts = lodash.isString(val) ? url.parse(val) : val;
        opts.route = key;

        return proxy(opts);
      });
    }
  }

}(require('lodash'), require('url'), require('proxy-middleware'));

exports = module.exports = ForwardProxy;
