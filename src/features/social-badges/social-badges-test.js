describe('socialBadges', function () {
  'use strict';

  var element, scope, dom;

  beforeEach(module('socialBadges'));
  beforeEach(module('features/social-badges/social-badges-template.html'));

  beforeEach(inject(function ($rootScope, $compile, $templateCache) {
    $templateCache.put('/features/social-badges/social-badges-template.html', $templateCache.get('features/social-badges/social-badges-template.html'));
    scope = $rootScope;
    element = $compile('<social-badges></social-badges>')(scope);
    scope.$digest();
  }));

  xit('should test the dom elements exist', function () {
    expect(dom.find('#fb-container').length).toBe(1);
    //throw('Incomplete test');
  });

});
