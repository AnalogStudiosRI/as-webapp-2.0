import { AuthenticationService } from './authentication.service';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

export interface EventInterface {
  id?: number,
  title: string,
  description: string,
  startTime: number,
  endTime: number,
  createdTime?: number
}

@Injectable()
export class EventsService {
  private API_URL_EVENTS: string = '/api/events';

  constructor(private http: Http, private AuthenticationService: AuthenticationService){
  }

  getEvent(id: number): Observable<EventInterface> {
    return this.http.get(this.API_URL_EVENTS + '/' + id)
      .map((response: Response) => {
        return response.json()[0] || {};
      })
  }

  getEvents(): Observable<EventInterface[]> {
    return this.http.get(this.API_URL_EVENTS)
      .map((response: Response) => {
        return response.json() || {};
      })
  }

  //TODO any
  addEvent(body: EventInterface): Observable <any>{
    let headers = new Headers({'Authorization': 'Bearer ' + this.AuthenticationService.getToken() });
    let options = new RequestOptions({'headers': headers});

    console.log('options', options);
    return this.http.post(this.API_URL_EVENTS, body, options)
      .map((response: Response) => {
        console.log('addEvent success');
        return response.json || {};
      })
  }

  updateEvent(id: number, body: EventInterface): Observable <any>{
    let headers = new Headers({'Authorization': 'Bearer ' + this.AuthenticationService.getToken() });
    let options = new RequestOptions({'headers': headers});

    console.log('options', options);
    return this.http.put(this.API_URL_EVENTS + '/' + id, body, options)
      .map((response: Response) => {
        console.log('updateEvent success');
        return response.json || {};
      })
  }
}