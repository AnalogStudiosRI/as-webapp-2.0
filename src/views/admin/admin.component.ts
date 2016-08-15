import { Component } from '@angular/core';
import { AuthenticationService } from '../../components/authentication/authentication.service';
import { FormBuilder, FormGroup, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";

@Component({
  selector: 'admin-view',
  templateUrl: './src/views/admin/admin.html',
  styleUrls: ['/node_modules/bootstrap/dist/css/bootstrap.min.css', './src/views/admin/admin.css'],
  directives: [ FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES ],
  providers: [AuthenticationService, FormBuilder]
})

export class AdminViewComponent {
  public credentials: FormGroup;

  constructor(private AuthenticationService: AuthenticationService, private FormBuilder: FormBuilder) {
    console.log('AdminViewComponent');

    this.credentials = this.FormBuilder.group({
      username: '',
      password: ''
    })
  }

  public login(): void {
    console.log('on submit');
    console.log('login !!!!');
    console.log('credentials', this.credentials);
    let username: string = this.credentials.controls['username'].value;
    let password: string = this.credentials.controls['password'].value
    console.log('username =>', username);
    console.log('password =>', password);
    this.AuthenticationService.login(username, password).subscribe((response) => {
      console.log('login response', response);
    },(err) => {
      console.log('err', err);
    })
  }

  public logout(): void {
    console.log('logout');
  }

  public getIsAuthenticated(): boolean {
    return this.AuthenticationService.isAuthentcated();
  }

}
//
// 'use strict';
//
// (function (angular) {
//
//   angular
//     .module('as.views.admin')
//     .controller('AdminViewController', adminViewController);
//
//   adminViewController.$inject = ['$log', '$state', '$modal', 'AuthenticationFactory', 'PubSubFactory', 'usSpinnerService'];
//
//   function adminViewController($log, $state, $modal, AuthenticationFactory, PubSubFactory, usSpinnerService) {
//     /*jshint validthis:true */
//     var vm = this;
//
//     vm.isAuthenticated = false;
//     vm.credentials = {
//       username: '',
//       password: ''
//     };
//
//     vm.login = function () {
//       usSpinnerService.spin('spinner-1');
//
//       var creds = vm.credentials;
//
//       AuthenticationFactory.login(creds.username, creds.password).then(function() {
//         usSpinnerService.stop('spinner-1');
//         vm.isAuthenticated = true;
//         $state.go('admin.events');
//       }, function () {
//         usSpinnerService.stop('spinner-1');
//         showModal('Invalid Credentials', 'Your username or password are incorrect.  Please try again.');
//       });
//     };
//
//     vm.logout = function () {
//       AuthenticationFactory.logout();
//       vm.isAuthenticated = false;  //XXX TODO use return value from logout
//     };
//
//     vm.init = function() {
//       $log.info('ENTER as.views.admin');
//       usSpinnerService.stop('spinner-1');
//
//       vm.isAuthenticated = AuthenticationFactory.isAuthenticated();
//
//       if (!vm.isAuthenticated) {
//         vm.logout();
//       }
//     };
//
//     function showModal(heading, body) {
//       modalInstanceController.$inject = ['$scope', '$modalInstance'];
//
//       function modalInstanceController($scope, $modalInstance) {
//         $scope.heading = heading;
//         $scope.body = body;
//
//         $scope.ok = function () {
//           $modalInstance.close();
//         };
//       }
//
//       $modal.open({
//         animation: true,
//         templateUrl: '/views/admin/templates/admin-view-modal.html',
//         controller: modalInstanceController
//       });
//     }
//
//     PubSubFactory.subscribe('RESPONSE_UNAUTH', function() {
//       vm.logout();
//       showModal('Session Expired', 'Your session has expired.  Please login again.');
//     });
//
//     PubSubFactory.subscribe('RESPONSE_BAD_PARAMS', function(response) {
//       if (response.config.url === '/api/login') {
//         vm.logout();
//         usSpinnerService.stop('spinner-1');
//         showModal('Invalid Credentials', 'Your username or password is incorrect.  Please try again.');
//       }
//     });
//
//     vm.init();
//
//   }
// }(angular));