import { Component, OnInit } from '@angular/core';
import { EventsService } from "../events/events.service";
import { EventInterface } from "../events/event.interface";

@Component({
  selector: 'as-calendar',
  templateUrl: './src/components/calendar/calendar.html',
  providers: [EventsService]
})

export class CalendarComponent implements OnInit {
  //TODO set the type here
  private events = [];

  constructor(private eventsService: EventsService){
  }

  ngOnInit() {
    this.eventsService.getEvents().subscribe((data) => {
      this.events = data;
    })
  }

}