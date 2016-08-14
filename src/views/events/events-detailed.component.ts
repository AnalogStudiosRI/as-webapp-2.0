import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventInterface } from '../../components/events-calendar/event.interface';
import { EventsService } from '../../components/events-calendar/events.service';

@Component({
  selector: 'events-detailed',
  templateUrl: './src/views/events/events-detailed.html',
  styleUrls: ['./node_modules/bootstrap/dist/css/bootstrap.min.css', './src/views/events/events.css'],
  providers: [EventsService]
})

export class EventsDetailedViewComponent extends OnInit {
  private event: EventInterface;

  constructor(private ActivatedRoute: ActivatedRoute, private EventsService: EventsService) {

  }

  ngOnInit() {
    //TODO get EventId from router

    this.ActivatedRoute.params.subscribe((params) => {
      let eventId: number = parseInt(params['id'], 10);

      this.EventsService.getEvent(eventId).subscribe((data: EventInterface) => {
        this.event = data;
      });
    });

  }

  public getEventDetails(): EventInterface {
    return this.event;
  }

}