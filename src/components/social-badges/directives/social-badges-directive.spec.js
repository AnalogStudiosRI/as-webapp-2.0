describe('as.components.socialBadges.directive.SocialBadgesDirectiveTest', function () {
  'use strict';

  var element;
  var scope;

  beforeEach(module('as.components.socialBadges'));
  beforeEach(module('templates'));

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope;
    element = angular.element('<as-social-badges></as-social-badges>');

    $compile(element)(scope);
    scope.$digest();
  }));

  it('should test the elements exist', function () {
    expect(element.find('#fb-container').length).toBe(1);
    expect(element.find('#gplus-container').length).toBe(1);
  });

});
