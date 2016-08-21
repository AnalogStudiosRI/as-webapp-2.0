import { Http, Response } from "@angular/http";
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';
import { LocalStorage } from 'angular2-localstorage/WebStorage';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
  //TODO constant - https://thegreenhouse.atlassian.net/browse/AS-246
  private API_URL_LOGIN: string = '/api/login';
  @LocalStorage('token') private token: string = null;

  //TODO $httpInterceptor? - https://thegreenhouse.atlassian.net/browse/AS-256
  constructor(private Http: Http, private JwtHelper: JwtHelper){
    if (this.token && !this.isValidToken(this.token)) {
      this.clearToken();
    }
  }

  private setToken(value: string) {
    this.token = this.isValidToken(value) ? value : null;
  }

  private clearToken(): void {
    this.token = null;
  }

  private isValidToken(tokenToValidate: string): boolean {

    try{
      return tokenToValidate && this.JwtHelper.decodeToken(tokenToValidate)
        && !this.JwtHelper.isTokenExpired(tokenToValidate);
    }catch(err){
      console.log('err', err);
    }
  }

  private isValidAuthenticationResponse(resp): boolean {
    let data = resp.data;

    return resp.success && data && data.jwt && typeof data.jwt === 'string';
  }

  public authenticate(username: string, password: string): Observable<any> {
    return this.Http.post(this.API_URL_LOGIN, {
      username: username,
      password: password
    }).map((response: Response) => {
      let resp = response.json();

      if(this.isValidAuthenticationResponse(resp)){
        this.setToken(resp.data.jwt);
      }else{
        this.clearToken();
      }

      return this.isAuthenticated();
    });
  }

  public unauthenticate(): void{
    this.clearToken();
  }

  public isAuthenticated(): boolean {
    return this.isValidToken(this.token);
  }

  public getToken(): string {
    return this.token;
  }

}