'use strict';

describe('AS.EventsPage.Controller.HomePageControllerTest', function () {

  var scope;
  var ctrl;
  var dom;

  beforeEach(module('AS.EventsPage'));
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

  xit('it should test something, eventually', function () {

  });

});