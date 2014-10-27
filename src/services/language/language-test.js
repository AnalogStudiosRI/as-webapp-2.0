describe('config', function () {
  'use strict';

  beforeEach(module('language'));

  it('should test Language.PAGE copy text exists', inject(function (Language) {
    var pages = Language.PAGE;

    //home page
    var home = pages.HOME;

    expect(home.WELCOME).toBeDefined();
  }));

  it('should test Language.MESSAGES messages exist', inject(function (Language) {
    var messages = Language.MESSAGES;

    expect(messages.UNEXPECTED).toBeDefined();
  }));

});
