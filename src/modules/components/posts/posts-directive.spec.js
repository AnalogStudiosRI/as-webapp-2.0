describe('as.components.posts.directive.PostsDirectiveTest', function () {
  'use strict';

  var $element;
  var $httpBackend;
  var $scope;

  beforeEach(module('as.components.posts'));
  beforeEach(module('templates'));

  beforeEach(inject(function ($rootScope, $compile, _$httpBackend_) {
    $scope = $rootScope;
    $element = angular.element('<as-posts></as-posts>');

    $httpBackend = _$httpBackend_;
    $httpBackend.when("GET", "/api/posts").respond([{
      id: 1,
      title: "mock title 1",
      summary: "mock summary 1",
      createdTime: new Date().getTime()
    }, {
      id: 2,
      title: "mock title 2",
      summary: "mock summary 2",
      createdTime: new Date().getTime()
    }]);

    $compile($element)($scope);
    $scope.$digest();
  }));

  it('should test the elements exist', function () {
    $httpBackend.flush();

    expect($element.find('h4').length).toBe(2);
    expect($element.find('span').length).toBe(2);
    expect($element.find('details').length).toBe(2);
    expect($element.find('hr').length).toBe(2);
  });

});
