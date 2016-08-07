import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { DATEPICKER_DIRECTIVES, DatePickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { EventsService } from "../events/events.service";
import { EventInterface } from "../events/event.interface";
import { FORM_DIRECTIVES } from '@angular/forms';


// @Component({
//   selector: 'my-datepicker',
//   template: '<p>Hello World Override!?!?!?!?!</p><datepicker [(ngModel)]="dt"></datepicker>'
// })
// <datepicker [(ngModel)]="dt"></datepicker>
//  [minDate]="minDate" [showWeeks]="false"
//'./src/components/calendar/templates/datepicker.html'
// class MyDatepicker extends DatePickerComponent{
//
// }

// export class MyDatepicker{
//   public dt: Date = new Date();
// }

@Component({
  selector: 'as-calendar',
  templateUrl: './src/components/calendar/calendar.html',
  providers: [EventsService],
  directives: [CORE_DIRECTIVES, DATEPICKER_DIRECTIVES, FORM_DIRECTIVES]
})

export class CalendarComponent implements OnInit {
  public events: Array<any> = [];
  public dt: Date = new Date();
  private currentMonthIndex: number = 0;
  private monthToIndexMapper: Object = {
    JANUARY: 0,
    FEBRUARY: 1,
    MARCH: 2,
    APRIL: 3,
    MAY: 4,
    JUNE: 5,
    JULY: 6,
    AUGUST: 7,
    SEPTEMBER: 8,
    OCTOBER: 9,
    NOVEMBER: 10,
    DECEMBER: 11
  };

  public minDate: Date = void 0;
  // public tomorrow: Date;
  // public afterTomorrow: Date;
  // public formats: Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
  // public format: string = this.formats[0];
  // public dateOptions: any = {
  //   formatYear: 'YY',
  //   startingDay: 1
  // };
  // private opened:boolean = false;

  public constructor(private eventsService: EventsService) {
    console.log('constructor', this.dt);
    // (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    // (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    // (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    // this.events = [
    //   {date: this.tomorrow, status: 'full'},
    //   {date: this.afterTomorrow, status: 'partially'}
    //];
  }

  // public getDate(): number {
  //   return this.dt && this.dt.getTime() || new Date().getTime();
  // }
  //
  // public today(): void {
  //   this.dt = new Date();
  // }
  //
  // public d20090824(): void {
  //   this.dt = moment('2009-08-24', 'YYYY-MM-DD').toDate();
  // }

  // todo: implement custom class cases
  // public getDayClass(date: any, mode: string): Array {
  //   console.log('getDayClass!!!!!!!', date);
  //   let dayToCheck = new Date(date).setHours(0, 0, 0, 0);
  //
  //   //check if day has an event
  //   for (var i = 0; i < this.events.length; i += 1) {
  //     var currentDay = new Date(this.events[i].date).setHours(0, 0, 0, 0);
  //
  //     if (dayToCheck === currentDay) {
  //       return ['day-event'];
  //     }
  //   }
  //
  //   return ['day-on'];
  //   //else return based on if date being checked in the current month
  //   //return date.getMonth() === this.currentMonthIndex ? 'day-on' : 'day-off';
  // }

  // public disabled(date: Date, mode: string): boolean {
  //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  // }
  //
  // public open(): void {
  //   this.opened = !this.opened;
  // }
  //
  // public clear(): void {
  //   this.dt = void 0;
  // }
  //
  // public toggleMin(): void {
  //   //this.dt = new Date(this.minDate.valueOf());
  // }

  private parseEventsResponse(response) {
    let events = [];

    response.forEach(response, function (n) {
      var event = n;
      var time = parseInt(event.startTime * 1000);

      event.date = new Date(time);

      events.push(event);
    });

    return events;
  }

  ngOnInit() {
    this.eventsService.getEvents().subscribe((data: Array<EventInterface>) => {
      //this.events = this.parseEventsResponse(data);
    })
  }

}