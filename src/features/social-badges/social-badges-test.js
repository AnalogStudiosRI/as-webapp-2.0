describe('socialBadges', function () {
  'use strict';

  var element, scope;

  beforeEach(module('socialBadges'));
  //beforeEach(module('templates'));

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope;
    element = angular.element('<social-badges></social-badges>');

    $compile(element)(scope);
    scope.$digest();
  }));

  it('should test the elements exist', function () {
    console.log(element);
    expect(element.find('#fb-container').length).toBe(1);
    expect(element.find('#gplus-container').length).toBe(1);
  });

});
