'use strict';

describe('AS.LanguageModule.Factory.LanguageFactoryTest', function () {

  beforeEach(module('AS.Language'));

  it('can get an instance of my factory', inject(function (LanguageFactory) {
    expect(LanguageFactory).toBeDefined();
  }));

  it('should test LanguageFactory.get() exists for PAGE text', inject(function (LanguageFactory) {
    var language = LanguageFactory.get().PAGE;

    expect(language).toBeDefined();
    expect(language.HOME.WELCOME).toBe('Welcome to the Analog Studios website');
  }));

  it('should test LanguageFactory.get() exists for MESSAGE text', inject(function (LanguageFactory) {
    var language = LanguageFactory.get().MESSAGE;

    expect(language).toBeDefined();
    expect(language.UNEXPECTED).toBe('Sorry, there was an unexpected error.  Please try again or contact the webmaster at XXX');
  }));

});