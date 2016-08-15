import { LocalStorage } from 'angular2-localstorage/WebStorage';
import { Http, Response } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
  //TODO constant
  private API_URL_LOGIN: string = '/api/login';
  @LocalStorage('token') private token: string = null;

  //TODO $httpInterceptor?
  constructor(private Http: Http){
    //TODO check token expiration here, unauthenticate immediately if expired
  }

  private setToken(value:string) {
    this.token = value || '';
  }

  private clearToken(): void {
    this.token = null;
  }

  private isValidAuthenticationResponse(resp): boolean {
    let data = resp.data;

    //TODO validate token expiration
    return resp.success && data && data.jwt && data.jwt !== '';
  }

  public authenticate(username: string, password: string): Observable<any> {
    return this.Http.post(this.API_URL_LOGIN, {
      username: username,
      password: password
    }).map((response: Response) => {
      let resp = response.json();

      if(this.isValidAuthenticationResponse){
        this.setToken(resp.data.jwt);
      }else{
        this.clearToken();
        console.error('authenticate call failed');
      }

      return this.isAuthenticated();
    })
  }

  public unauthenticate(): void{
    this.clearToken();
  }

  public isAuthenticated(): boolean {
    //TODO check token expiration
    return this.token ? true : false;
  }

  public getToken(): string {
    return this.token;
  }
}