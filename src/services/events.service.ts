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

  private getOptionsForAuthentication(): RequestOptions{
    let headers = new Headers({'Authorization': 'Bearer ' + this.AuthenticationService.getToken() });
    let options = new RequestOptions({'headers': headers});

    return options;
  }

  //TODO combine?
  public getEvent(id: number): Observable<EventInterface> {

    return this.http.get(this.API_URL_EVENTS + '/' + id)
      .map((response: Response) => {
        return response.json()[0] || {};
      })
  }

  //TODO combine?
  public getEvents(): Observable<EventInterface[]> {

    return this.http.get(this.API_URL_EVENTS)
      .map((response: Response) => {
        return response.json() || {};
      })
  }

  //TODO any - https://thegreenhouse.atlassian.net/browse/AS-246
  public createEvent(body: EventInterface): Observable <any>{

    return this.http.post(this.API_URL_EVENTS, body, this.getOptionsForAuthentication())
      .map((response: Response) => {
        return response.json || {};
      })
  }

  public updateEvent(eventId: number, body: EventInterface): Observable <any>{

    return this.http.put(this.API_URL_EVENTS + '/' + eventId, body, this.getOptionsForAuthentication())
      .map((response: Response) => {
        return response.json || {};
      })
  }
}