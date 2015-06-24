'use strict';

describe('as.module.bootstrap.config.BootstrapConfigTest', function () {

  var interpolate;

  beforeEach(module('as.module.bootstrap'));

  beforeEach(inject(function ($interpolate) {
    interpolate = $interpolate;
  }));

  it('it should test that the custom angular bindings are set correctly', function () {

    expect(interpolate.startSymbol()).toBe('[[');
    expect(interpolate.endSymbol()).toBe(']]');
  });

});