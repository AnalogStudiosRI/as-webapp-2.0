'use strict';

describe('as.components.posts.factory.PostsFactoryTest', function () {

  beforeEach(module('as.components.posts'));

  it('can get an instance of PostsFactory', inject(function (PostsFactory) {
    expect(PostsFactory).toBeDefined();
  }));

});