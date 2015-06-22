'use strict';

describe('as.module.config.factory.ConfigFactoryTest', function () {

  beforeEach(module('as.module.config'));

  it('can get an instance of ConfigFactory', inject(function (ConfigFactory) {
    expect(ConfigFactory).toBeDefined();
  }));


  it('should test ConfigFactory.get("ENDPOINT") and all properties exist', inject(function (ConfigFactory) {
    var endpoint = ConfigFactory.get('ENDPOINT');

    expect(endpoint).toBeDefined();
    expect(endpoint.EVENTS).toBeDefined();
  }));

  it('should test ConfigFactory.get("ENDPOINT.EVENTS") exists', inject(function (ConfigFactory) {
    var url = ConfigFactory.get('ENDPOINT.EVENTS');
    var isString = typeof url === 'string';

    expect(isString).toBe(true);
  }));

  it('should test that the universal selector ( * ) works', inject(function (ConfigFactory) {
    var config = ConfigFactory.get('*');

    expect(config.ENDPOINT).toBeDefined();
    expect(config.ENDPOINT.EVENTS).toBeDefined();
  }));

  it('should test that passing an incorrect param throws an error', inject(function (ConfigFactory) {
    var query = 'owen';

    expect(function () {
      return ConfigFactory.get(query);
    }).toThrow(new Error('unsupported property => ' + query));

  }));

});