import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventInterface, EventsService } from '../../services/events.service';
import { SocialShareComponent } from '../../components/social-share/social-share.component';

@Component({
  selector: 'events-detailed',
  templateUrl: './event-details.html',
  styleUrls: [ './events.less' ],
  directives: [ SocialShareComponent ]
})

export class EventDetailsViewComponent extends OnInit {
  //TODO any - https://thegreenhouse.atlassian.net/browse/AS-246
  private activeRouteSubscriber: any;
  private event: EventInterface;

  constructor(private ActivatedRoute: ActivatedRoute, private EventsService: EventsService) {
    super();
  }

  ngOnInit(): void {
    this.activeRouteSubscriber = this.ActivatedRoute.params.subscribe((params) => {
      let eventId: number = parseInt(params['id'], 10);

      this.EventsService.getEvent(eventId).subscribe((data: EventInterface) => {
        this.event = data;
      });
    });
  }

  ngOnDestroy(): void {
    this.activeRouteSubscriber.unsubscribe();
  }

  public getEventDetails(): EventInterface {
    return this.event;
  }

}