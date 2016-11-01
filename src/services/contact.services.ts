import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

export interface ContactInterface {
  subject: string,
  message: string
}

@Injectable()
export class ContactService {
  //TODO const
  private API_URL_CONTACT: string = '/api/contact';

  constructor(private Http: Http) {

  }

  contact(body: ContactInterface){
    return this.Http.post(this.API_URL_CONTACT, body)
      .map((response: Response) => {
        return response.json()[0] || {};
      })
  }
}