'use strict';

describe('AS.ConfigModule.Factory.ConfigFactoryTest', function () {

  beforeEach(module('AS.Config'));

  it('should test Config.get("ENDPOINT") exists', inject(function (ConfigFactory) {
    var endpoint = ConfigFactory.get('ENDPOINT');

    expect(endpoint).toBeDefined();
    expect(endpoint.LOGGER).toBeDefined();
    expect(endpoint.EVENTS).toBeDefined();
  }));

  it('should test Config.get("LOG_LEVEL") exists', inject(function (ConfigFactory) {
    var logLevel = ConfigFactory.get('LOG_LEVEL');

    expect(logLevel).toBeDefined();
  }));

});