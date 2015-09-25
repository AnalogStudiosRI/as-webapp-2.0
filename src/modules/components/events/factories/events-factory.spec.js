'use strict';

describe('as.components.events.factory.EventsFactoryTest', function () {

  beforeEach(module('as.components.events'));

  it('can get an instance of EventsFactory', inject(function (EventsFactory) {
    expect(EventsFactory).toBeDefined();
  }));

});