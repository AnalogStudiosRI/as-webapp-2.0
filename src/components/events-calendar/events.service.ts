import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { EventInterface } from "./event.interface";

@Injectable()
export class EventsService {
  private API_URL_EVENTS: string = '/api/events';

  constructor(private http: Http){
  }

  getEvent(id: number): Observable<EventInterface> {
    return this.http.get(this.API_URL_EVENTS + '/' + id)
      .map((response: Response) => {
        return response.json()[0] || {};
      }).catch(() => {
        return Observable.throw('EventsService.getEvent() Observable thrown');
      })
  }

  getEvents(): Observable<EventInterface[]> {
    return this.http.get(this.API_URL_EVENTS)
      .map((response: Response) => {
        return response.json() || {};
      })
  }
}