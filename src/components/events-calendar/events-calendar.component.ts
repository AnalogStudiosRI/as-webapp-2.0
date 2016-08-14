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
    let startingDay = new Date(this.currentYear, this.currentMonthIndex).getDay();

    for(let i = 0, j = this.MAX_CALENDAR_SPACES; i < j; i += 1){
      let daysInMonth = this.CALENDAR[this.currentMonthIndex].DAYS;
      let day = {
        date: null,
        hasEvents: false,
        events: []
      };

      //use null to block out dates from previous or future months
      //while still keeping the calendar looking "full"
      if (i >= startingDay && i <= daysInMonth) {
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

      console.log('day.date', day.date);
      if(week.length === this.DAYS_IN_WEEK) {
        this.currentMonthData.push(week);
        week = [];
      }

    }

    console.log('currentMonthData', this.currentMonthData);
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

  public getCurrentYear(): number {
    return this.currentYear;
  }

  public getCurrentMonth(): number {
    return this.CALENDAR[this.currentMonthIndex].NAME;
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