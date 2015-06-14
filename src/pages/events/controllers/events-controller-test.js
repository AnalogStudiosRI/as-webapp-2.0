'use strict';

xdescribe('as.page.events.controller.HomePageControllerTest', function () {

  var scope;
  var ctrl;
  var dom;

  beforeEach(module('as.page.events'));
  beforeEach(inject(function ($compile, $rootScope, $controller) {
    scope = $rootScope.$new();
    dom = angular.element('<div></div>');

    scope.HomeCtrl = {
      model: {}
    };

    ctrl = $controller('EventsPageController', {
      $scope: scope
    });

    $compile(dom)(scope);
    scope.$digest();
  }));

  it('it should test something, eventually', function () {

  });

});