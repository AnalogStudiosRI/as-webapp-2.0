'use strict';

describe('myFactory', function () {

  beforeEach(module('AS.Events'));

  it('can get an instance of my factory', inject(function (EventsFactory) {
    expect(EventsFactory).toBeDefined();
  }));

});