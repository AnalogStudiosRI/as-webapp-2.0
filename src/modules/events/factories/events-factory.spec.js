'use strict';

describe('as.module.events.factory.EventsFactoryTest', function () {

  beforeEach(module('as.module.events'));

  it('can get an instance of EventsFactory', inject(function (EventsFactory) {
    expect(EventsFactory).toBeDefined();
  }));

});