import { Component } from '@angular/core';
import { EventsCalendarComponent } from '../../components/events-calendar/events-calendar.component';

@Component({
  selector: 'events',
  templateUrl: './src/views/events/events.html',
  styleUrls: ['./node_modules/bootstrap/dist/css/bootstrap.min.css'],
  directives: <any>[EventsCalendarComponent]
})

export class EventsViewComponent { }