import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { EventInterface } from "./event.interface";

@Injectable()
export class EventsService {
  private eventsApiUrl = '/api/events';

  constructor(private http: Http){
  }

  getEvents(): Observable<EventInterface[]> {
    return this.http.get(this.eventsApiUrl)
      .map((response: Response) => {
        return response.json() || {};
      }).catch(() => {
        return Observable.throw('EventsService.getEvents() Observable thrown');
      })
  }
}