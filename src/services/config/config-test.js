describe('config', function () {
  'use strict';

  beforeEach(module('config'));

  it('should test Config.get("DEFAULT_CATEGORY") exists', inject(function (Config) {
    var DEFAULT_CATEGORY = Config.get('DEFAULT_CATEGORY');

    expect(DEFAULT_CATEGORY).toBeDefined();
  }));

  it('should test Config.get("ENDPOINT") exists', inject(function (Config) {
    var ENDPOINT = Config.get('ENDPOINT');

    expect(ENDPOINT).toBeDefined();
    expect(ENDPOINT.CATEGORY).toBeDefined();
    expect(ENDPOINT.LOGGER).toBeDefined();
    expect(ENDPOINT.SESSION).toBeDefined();
    expect(ENDPOINT.SETTING).toBeDefined();
  }));


  it('should test Config.get("LINK") exists', inject(function (Config) {
    var LINK = Config.get('LINK');

    expect(LINK).toBeDefined();
    expect(LINK.ETSY).toBeDefined();
    expect(LINK.FACEBOOK).toBeDefined();
  }));

  it('should test Config.get("PRODUCTS_IMG_PATH") exists', inject(function (Config) {
    var PRODUCTS_IMG_PATH = Config.get('PRODUCTS_IMG_PATH');

    expect(PRODUCTS_IMG_PATH).toBeDefined();
  }));

  it('should test Config.get("LOG_LEVEL") exists', inject(function (Config) {
    var LOG_LEVEL = Config.get('LOG_LEVEL');

    expect(LOG_LEVEL).toBeDefined();
  }));


  it('should test Config.get("TIMER") exists', inject(function (Config) {
    var TIMER = Config.get('TIMER');

    expect(TIMER).toBeDefined();
    expect(TIMER.SLIDESHOW).toBeDefined();
  }));

});
