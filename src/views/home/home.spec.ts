// 'use strict';
//
// describe('as.views.home.controller.HomeViewControllerTest', function () {
//   var scope;
//   var ctrl;
//   var dom;
//
//   beforeEach(module('as.bootstrap'));
//   beforeEach(module('as.components.socialShare'));
//   beforeEach(module('as.views.home'));
//
//   beforeEach(inject(function ($compile, $rootScope, $controller) {
//     scope = $rootScope.$new();
//     dom = angular.element('<div></div>');
//
//     scope.HomeCtrl = {
//       model: {}
//     };
//
//     ctrl = $controller('HomeViewController', {
//       $scope: scope
//     });
//
//     $compile(dom)(scope);
//     scope.$digest();
//   }));
//
//   xit('it should test that social share is seen', function () {
//     expect(dom.find('as-social-share').length).toBe(1);
//   });
//
// });