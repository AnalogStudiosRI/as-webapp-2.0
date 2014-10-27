describe('config', function () {
  'use strict';

  beforeEach(module('language'));

  it('should test Language.ERROR messages exist', inject(function (Language) {
    var error = Language.ERROR;

    expect(error.UNEXPECTED).toBeDefined();
  }));

});
