import { Component, OnInit } from '@angular/core';
import { EventInterface, EventsService } from '../../services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'as-events-calendar',
  templateUrl: './events-calendar.html',
  styleUrls: [ './events-calendar.scss' ],
  providers: [ EventsService ]
})

export class EventsCalendarComponent extends OnInit {
  //TODO make true constants https://thegreenhouse.atlassian.net/browse/AS-246
  private DAYS_IN_WEEK: number = 7;
  private MAX_CALENDAR_SPACES: number = 35;
  private CALENDAR: Array<any> = [
    { NAME: 'January', DAYS: 31 },
    { NAME: 'February', DAYS: 28 },
    { NAME: 'March', DAYS: 31 },
    { NAME: 'April', DAYS: 30 },
    { NAME: 'May', DAYS: 31 },
    { NAME: 'June', DAYS: 30 },
    { NAME: 'July', DAYS: 31 },
    { NAME: 'August', DAYS: 31 },
    { NAME: 'September', DAYS: 30 },
    { NAME: 'October', DAYS: 31 },
    { NAME: 'November', DAYS: 30 },
    { NAME: 'December', DAYS: 31 }
  ];
  private events: Array<EventInterface> = [];
  private currentMonthIndex: number;
  private currentYear: number;
  private currentEventIndex: number = 0;
  private hasEvents: boolean = false;
  public currentMonthData: Array<any> = [];

  constructor(private Router: Router, private EventsService: EventsService) {
    super();
    let now = new Date();
    this.currentMonthIndex = now.getMonth();
    this.currentYear = now.getFullYear();
  }

  private calculateCurrentMonthData(): void {
    this.currentMonthData = [];
    let week:Array<Object> = [];
    let monthDateCounter: number = 1;
    let startingDayOfMonth = new Date(this.currentYear, this.currentMonthIndex).getDay();
    let daysInMonth = this.CALENDAR[this.currentMonthIndex].DAYS;

    for(let i = 0, j = this.MAX_CALENDAR_SPACES; i < j; i += 1){
      //use null as date default to block out tiles in our calenader that aren't in the month
      //while still keeping the calendar looking "full"
      let day = {
        date: null,
        hasEvents: false,
        events: []
      };

      if (i >= startingDayOfMonth && monthDateCounter <= daysInMonth) {
        day.date = monthDateCounter;

        //check if day has an event
        for(let k = 0, m = this.events.length; k < m; k += 1){
          //TODO any https://thegreenhouse.atlassian.net/browse/AS-246
          let event: any = this.events[k];
          let eventStartTimeTimestamp: number = event.startTime;
          let currentDayStartTimestamp: number = new Date(this.currentYear, this.currentMonthIndex, monthDateCounter, 0, 0, 0).getTime() / 1000;
          let currentDayEndTimestamp: number = new Date(this.currentYear, this.currentMonthIndex, monthDateCounter, 23, 0, 0).getTime() / 1000;

          if(eventStartTimeTimestamp >= currentDayStartTimestamp &&
             eventStartTimeTimestamp <= currentDayEndTimestamp){
            //TODO support multiple events on same day https://thegreenhouse.atlassian.net/browse/AS-260
            if(!day.hasEvents) {
              day.events.push(event);
              day.hasEvents = true;
            }
          }
        }

        monthDateCounter += 1;
      }

      week.push(day);

      if(week.length === this.DAYS_IN_WEEK) {
        this.currentMonthData.push(week);
        week = [];
      }

    }
  }

  //TODO delete
  private generateEventsCarouselData(): void {
    let now = new Date().getTime() / 1000;

    for(let i = 0, l = this.events.length; i < l; i++){
      if(now > this.events[i].startTime){
        this.currentEventIndex = i;
      }
    }
  }

  private calculatePreviousMonth(): void{
    if(this.currentMonthIndex === 0){
      this.currentMonthIndex = 11;
      this.currentYear -= 1;
    }else{
      this.currentMonthIndex -= 1;
    }

    this.calculateCurrentMonthData();
  }

  private calculateNextMonth(): void{
    if(this.currentMonthIndex === 11){
      this.currentMonthIndex = 0;
      this.currentYear += 1;
    }else{
      this.currentMonthIndex += 1;
    }

    this.calculateCurrentMonthData();
  }

  public getHeaderText(): string {
    return this.CALENDAR[this.currentMonthIndex].NAME + ' ' + this.currentYear;
  }

  public shiftToPreviousMonth(): void {
    this.calculatePreviousMonth();
  }

  public shiftToNextMonth(): void {
    this.calculateNextMonth();
  }

  public selectEvent(selectedEvent): void {
    //TODO make this a callback from the consumer???
    this.Router.navigate(['events', selectedEvent.id]);
  }

  //TODO delete
  public getCurrentEvent(): EventInterface {
    return this.events[this.currentEventIndex];
  }

  //TODO delete
  public shiftToPreviousCarousel(): void{
    if(this.currentEventIndex === 0){
      this.currentEventIndex = this.events.length - 1;
    }else{
      this.currentEventIndex -= 1;
    }
  }

  //TODO delete
  public shiftToNextCarousel(): void {
    if(this.currentEventIndex === this.events.length - 1){
      this.currentEventIndex = 0;
    }else{
      this.currentEventIndex += 1;
    }
  }

  //TODO delete
  public getHasEvents(): boolean {
    return this.hasEvents;
  }

  ngOnInit(): void {
    this.EventsService.getEvents().subscribe((data: Array<EventInterface>) => {
      this.events = data;
      this.calculateCurrentMonthData(); //for desktop
      this.generateEventsCarouselData();  //for mobile / tablet  //TODO delete
      this.hasEvents = this.events.length !== 0;
    }, (error) => {
      console.error('error', error);
    })
  }
}