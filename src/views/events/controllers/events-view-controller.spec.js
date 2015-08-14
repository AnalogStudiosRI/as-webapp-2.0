'use strict';

xdescribe('as.views.events.controller.EventsViewControllerTest', function () {

  var scope;
  var ctrl;
  var dom;
  var httpBackend;
  var http;

  beforeEach(module('as.components.events'));
  beforeEach(module('as.views.events'));

  beforeEach(inject(function ($compile, $rootScope, $controller, $httpBackend, $http) {
    httpBackend = $httpBackend;
    http = $http;
    scope = $rootScope.$new();
    dom = angular.element('<section><div data-calendar></div></section>');

    scope.EvensCtrl = {
      model: {},
      init: function () { }
    };

    ctrl = $controller('EventsViewController', {
      $scope: scope
    });

    spyOn(scope.EventsCtrl, 'init');
    httpBackend.when('GET', '/api/events').respond([{}, {}, {}]);

    $compile(dom)(scope);
    scope.$digest();
  }));

  it('it should test that the page was initialized correctly', function () {
    //expect(ctrl.$scope.EventsCtrl.init).toHaveBeenCalled();

    httpBackend.flush();

    expect(scope.EventsCtrl.model.events.length).toBe(3);
    expect(dom.find('.calendar').length).toBe(1);
  });

});