import { Component, OnInit } from '@angular/core';
import { EventInterface } from './event.interface';
import { EventsService } from './events.service';

@Component({
  selector: 'as-events-calendar',
  templateUrl: './src/components/events-calendar/events-calendar.html',
  styleUrls: ['./src/components/events-calendar/events-calendar.css'],
  providers: [EventsService]
})

export class EventsCalendarComponent extends OnInit {
  //TODO make true constants ???
  private DAYS_IN_WEEK: number = 7;
  private MAX_CALENDAR_SPACES: number = 35;
  private CALENDAR: Array<any> = [
    { NAME: 'Jan.', DAYS: 31 },
    { NAME: 'Feb.', DAYS: 28 },
    { NAME: 'March', DAYS: 31 },
    { NAME: 'April', DAYS: 30 },
    { NAME: 'May', DAYS: 31 },
    { NAME: 'June', DAYS: 30 },
    { NAME: 'July', DAYS: 31 },
    { NAME: 'Aug.', DAYS: 31 },
    { NAME: 'Sept.', DAYS: 30 },
    { NAME: 'Oct.', DAYS: 31 },
    { NAME: 'Nov.', DAYS: 30 },
    { NAME: 'Dec.', DAYS: 31 }
  ];
  private events: Array<EventInterface> = [];
  private currentMonthIndex: number;
  private currentYear: number;
  public currentMonthData: Array<any> = [];

  constructor(private eventsService: EventsService) {
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

      if (i >= startingDayOfMonth && i <= daysInMonth) {
        day.date = monthDateCounter;
        monthDateCounter += 1;

        //check if day has an event
        for(let k = 0, m = this.events.length; k < m; k +=1 ){
          let event: any = this.events[k];  //TODO any
          let eventStartTimeTimestamp: number = event.startTime;
          let currentDayStartTimestamp: number = new Date(this.currentYear, this.currentMonthIndex, monthDateCounter, 0, 0, 0).getTime() / 1000;
          let currentDayEndTimestamp: number = new Date(this.currentYear, this.currentMonthIndex, monthDateCounter, 23, 0, 0).getTime() / 1000;

          if(eventStartTimeTimestamp >= currentDayStartTimestamp &&
             eventStartTimeTimestamp <= currentDayEndTimestamp){
            day.events.push(event);
            day.hasEvents = true;
          }
        }
      }

      week.push(day);

      if(week.length === this.DAYS_IN_WEEK) {
        this.currentMonthData.push(week);
        week = [];
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
    console.log('selectedEvent', selectedEvent);
    //TODO goto event
  }

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe((data: Array<EventInterface>) => {
      this.events = data;
      this.calculateCurrentMonthData();
    });
  }
}