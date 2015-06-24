'use strict';

describe('as.module.config.factory.ConfigFactoryTest', function () {

  beforeEach(module('as.module.config'));

  it('can get an instance of ConfigFactory', inject(function (ConfigFactory) {
    expect(ConfigFactory).toBeDefined();
  }));


  it('should test ConfigFactory.get("ENDPOINT") exists', inject(function (ConfigFactory) {
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