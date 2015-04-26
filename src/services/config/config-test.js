describe('config', function () {
  'use strict';

  beforeEach(module('config'));

  it('should test Config.get("ENDPOINT") exists', inject(function (Config) {
    var endpoint = Config.get('ENDPOINT');

    expect(endpoint).toBeDefined();
    expect(endpoint.LOGGER).toBeDefined();
    expect(endpoint.EVENTS).toBeDefined();
  }));

  it('should test Config.get("LOG_LEVEL") exists', inject(function (Config) {
    var logLevel = Config.get('LOG_LEVEL');

    expect(logLevel).toBeDefined();
  }));

});
