'use strict';

describe('as.component.events.factory.EventsFactoryTest', function () {

  beforeEach(module('as.component.events'));

  it('can get an instance of EventsFactory', inject(function (EventsFactory) {
    expect(EventsFactory).toBeDefined();
  }));

});