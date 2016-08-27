import { Component } from '@angular/core';
import { EventsCalendarComponent } from '../../components/events-calendar/events-calendar.component';

@Component({
  selector: 'events',
  templateUrl: './events.html',
  directives: <any>[ EventsCalendarComponent ]
})

export class EventsViewComponent {}