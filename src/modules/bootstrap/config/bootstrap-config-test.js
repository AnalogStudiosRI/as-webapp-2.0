'use strict';

describe('AS.Bootstrap', function () {

  var interpolate;

  beforeEach(module('AS.Bootstrap'));

  beforeEach(inject(function ($interpolate) {
    interpolate = $interpolate;
  }));

  it('it should test that the custom angular bindings are set correctly', function () {

    expect(interpolate.startSymbol()).toBe('[[');
    expect(interpolate.endSymbol()).toBe(']]');
  });

});