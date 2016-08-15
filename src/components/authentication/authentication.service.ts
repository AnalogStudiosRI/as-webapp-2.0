//import { LocalStorageService } from 'angular2-localstorage/LocalStorageEmitter';
import { Http, Response } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
  //TODO constant
  private JWT_KEY: string = 'token';
  private API_URL_LOGIN: string = '/api/login';
  private isAuthenticated: boolean = false;
  private token: string;

  constructor(private Http: Http){

  }

  //set token
  //get token

  public authenticate(username: string, password: string): Observable<any> {
    return this.Http.post(this.API_URL_LOGIN, {
      username: username,
      password: password
    }).map((response: Response) => {
      this.isAuthenticated = true;
      this.token = response.json().data.token;

      return this.hasAuthenticated();
    })
  }

  public hasAuthenticated(): boolean{
    return this.isAuthenticated;
  }
}
//     return {
//
//       getToken: function () {
//         return localStorageService.get(JWT_KEY);
//       },
//
//       isAuthenticated: function () {
//         var token = localStorageService.get(JWT_KEY) || '';
//         var isValid = token && angular.isString(token) && token !== '' && !jwtHelper.isTokenExpired(token);
//
//         return isValid;
//       },
//
//       login: function (username, password) {
//         var deferred = $q.defer();
//
//         $http.post('/api/login', {
//           username: username ? username : '',
//           password: password ? password : ''
//         }).success(function (response) {
//           deferred.resolve(response);
//           localStorageService.set(JWT_KEY, response.data.jwt);
//         }).error(function(response) {
//           deferred.reject(response);
//           $log.error('error in $http request');
//           $log.debug(response);
//         });
//
//         return deferred.promise;
//       },
//
//       logout: function () {
//         return localStorageService.remove(JWT_KEY);
//       }
//
//     };
//
//   }
// }(angular));