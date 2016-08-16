import { Http, Response } from "@angular/http";
import { Injectable } from '@angular/core';
//import { JwtHelper } from 'angular2-jwt';
import { LocalStorage } from 'angular2-localstorage/WebStorage';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
  //TODO constant
  private API_URL_LOGIN: string = '/api/login';
  @LocalStorage('token') private token: string = null;

  //TODO $httpInterceptor?
  //TODO private JwtHelper: JwtHelper
  constructor(private Http: Http){
    //TODO validate token expiration !this.JwtHelper.isTokenExpired(this.token)
  }

  private setToken(value: string) {
    //TODO validate token value
    this.token = value || null;
  }

  private clearToken(): void {
    this.token = null;
  }

  private static isValidAuthenticationResponse(resp): boolean {
    let data = resp.data;

    //TODO validate token expiration !this.JwtHelper.isTokenExpired(this.token)
    //TODO validate token decoding? this.JwtHelper.decodeToken(data.jwt)
    return resp.success && data && data.jwt && typeof data.jwt === 'string';
  }

  public authenticate(username: string, password: string): Observable<any> {
    return this.Http.post(this.API_URL_LOGIN, {
      username: username,
      password: password
    }).map((response: Response) => {
      let resp = response.json();

      if(self.isValidAuthenticationResponse(resp)){
        //TODO decode token this.JwtHelper.decodeToken(resp.data.jwt)
        this.setToken(resp.data.jwt);
      }else{
        console.error('authenticate call failed');
        this.clearToken();
      }

      return this.isAuthenticated();
    })
  }

  public unauthenticate(): void{
    this.clearToken();
  }

  public isAuthenticated(): boolean {
    //TODO validate token expiration !this.JwtHelper.isTokenExpired(this.token)
    return this.token ? true : false;
  }

  public getToken(): string {
    return this.token;
  }
}