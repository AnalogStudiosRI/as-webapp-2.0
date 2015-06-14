'use strict';

describe('AS.EventsModule.Factory.EventsFactoryTest', function () {

  beforeEach(module('AS.Events'));

  it('can get an instance of my factory', inject(function (EventsFactory) {
    expect(EventsFactory).toBeDefined();
  }));

});