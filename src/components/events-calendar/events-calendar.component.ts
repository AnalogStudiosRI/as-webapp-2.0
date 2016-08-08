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
  //TODO make true constants
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
  private now: Date = new Date();
  private startOfCurrentMonth: Date;
  public idx: number = 0;
  public calendar: Object = {};

  constructor(private eventsService: EventsService) {
    super();
    this.startOfCurrentMonth = new Date(this.now.getFullYear(), this.now.getMonth(), 1, 0, 0, 0, 0);
  }

  private convertToUnixTimestamp(millis): number {
    return Math.round(millis / 1000);
  }

  private generateCalendar() {
    console.log('generateCalendar', this.events);
    var months = [];

    if (this.events.length > 0) {
      var startingPeriod = new Date(this.startOfCurrentMonth.getTime());
      var currentMonth = startingPeriod.getMonth();
      var currentYear = startingPeriod.getFullYear();
      var endingPeriod = new Date(this.events[this.events.length - 1].startTime * 1000);
      var numberOfMonths = (endingPeriod.getFullYear() - this.startOfCurrentMonth.getFullYear()) * 12 + (endingPeriod.getMonth() - this.startOfCurrentMonth.getMonth()) + 1;

      for (var i = 0, l = numberOfMonths; i < l; i += 1) {
        var daysInMonth = this.CALENDAR[currentMonth].DAYS;
        var week = [];
        var month:any = {
          weeks: [],
          idx: currentMonth,
          year: currentYear
        };

        for (var j = 0, k = this.MAX_CALENDAR_SPACES; j < k; j += 1) {
          var day = {
            date: '' || 0,
            hasEvents: false,
            events: []
          };

          //use null to block out dates from previous or future months
          //while still keeping the calendar looking "full"
          if (j >= 1 && j <= daysInMonth) {
            day.date = j;
          }

          for (var m = 0, n = this.events.length; m < n; m += 1) {
            var event = this.events[m];
            var dayStartTime = this.convertToUnixTimestamp(new Date(currentYear, currentMonth, j, 0, 0, 0, 0).getTime());
            var dayEndTime = this.convertToUnixTimestamp(new Date(currentYear, currentMonth, j, 23, 59, 59, 0).getTime());

            if (event.startTime >= dayStartTime && event.startTime <= dayEndTime) {
              day.hasEvents = true;
              day.events.push(event);
            }
          }

          week.push(day);

          //append to month
          //and start a new week
          if (week.length === 7) {
            month.weeks.push(week);
            week = [];
          }
        }

        //append last week (if it has days)
        //and reset week
        if (week.length > 0) {
          month.weeks.push(week);
          week = [];
        }

        //append to months
        //and reset month
        months.push(month);
        month = {};

        currentMonth = currentMonth += 1;

        //wrap to start of the year
        if (currentMonth > 11) {
          currentYear = currentYear += 1;
          currentMonth = 0;
        }
      }
    }

    console.log('months', months);
    return months;
  }

  public getCurrentYear(): string {
    console.log('TODODODO');
    //[[ model.calendar[model.idx].year ]]
    return 'getCurrentYear';
  }

  public getCurrentMonth(): string {
    console.log('TODODOO!!!!');
    return 'getCurrentMonth';
    //return this.CALENDAR[this.calendar[idx].idx].NAME
  }

  //next month
  //previous month
  //callback

  ngOnInit() {
    this.eventsService.getEvents().subscribe((data: Array<EventInterface>) => {
      this.events = data;
      this.calendar = this.generateCalendar();
    });
  }
}


//   function convertToUnixTimestamp(millis) {
//     return Math.round(millis / 1000);
//   }
//
//   function filterEvents(events) {
//     var filteredEvents = [];
//
//     for (var i = 0, l = events.length; i < l; i += 1) {
//       var event = events[i];
//       var startTime = convertToUnixTimestamp(startOfCurrentMonth.getTime());
//
//       event.startTime = parseInt(event.startTime, 10);
//       event.endTime = parseInt(event.endTime, 10);
//
//       if (event.startTime && (event.startTime >= startTime)) {
//         filteredEvents.push(event);
//       }
//     }
//
//     return filteredEvents;
//   }
//
//   function sortEvents(a, b) {
//     if (a.startTime > b.startTime) {
//       return 1;
//     }
//
//     if (a.startTime < b.startTime) {
//       return -1;
//     }
//
//     // a must be equal to b
//     return 0;
//   }
//
//   function processData(data) {
//     var filtered = filterEvents(data);
//     var sorted = filtered.sort(sortEvents);
//
//     return sorted;
//   }
//
//   function generateCalendar(events) {
//     var months = [];
//
//     if (events.length > 0) {
//       var MAX_CALENDAR_SPACES = 35;
//       var startingPeriod = new Date(startOfCurrentMonth.getTime());
//       var currentMonth = startingPeriod.getMonth();
//       var currentYear = startingPeriod.getFullYear();
//       var endingPeriod = new Date(events[events.length - 1].startTime * 1000);
//       var numberOfMonths = (endingPeriod.getFullYear() - startOfCurrentMonth.getFullYear()) * 12 + (endingPeriod.getMonth() - startOfCurrentMonth.getMonth()) + 1;
//
//       for (var i = 0, l = numberOfMonths; i < l; i += 1) {
//         var daysInMonth = CALENDAR[currentMonth].DAYS;
//         var week = [];
//         var month = {
//           weeks: [],
//           idx: currentMonth,
//           year: currentYear
//         };
//
//         for (var j = 0, k = MAX_CALENDAR_SPACES; j < k; j += 1) {
//           var day = {
//             date: '',
//             hasEvents: false,
//             events: []
//           };
//
//           //use null to block out dates from previous or future months
//           //while still keeping the calendar looking "full"
//           if (j >= 1 && j <= daysInMonth) {
//             day.date = j;
//           }
//
//           for (var m = 0, n = events.length; m < n; m += 1) {
//             var event = events[m];
//             var dayStartTime = convertToUnixTimestamp(new Date(currentYear, currentMonth, j, 0, 0, 0, 0).getTime());
//             var dayEndTime = convertToUnixTimestamp(new Date(currentYear, currentMonth, j, 23, 59, 59, 0).getTime());
//
//             if (event.startTime >= dayStartTime && event.startTime <= dayEndTime) {
//               day.hasEvents = true;
//               day.events.push(event);
//             }
//           }
//
//           week.push(day);
//
//           //append to month
//           //and start a new week
//           if (week.length === 7) {
//             month.weeks.push(week);
//             week = [];
//           }
//         }
//
//         //append last week (if it has days)
//         //and reset week
//         if (week.length > 0) {
//           month.weeks.push(week);
//           week = [];
//         }
//
//         //append to months
//         //and reset month
//         months.push(month);
//         month = {};
//
//         currentMonth = currentMonth += 1;
//
//         //wrap to start of the year
//         if (currentMonth > 11) {
//           currentYear = currentYear += 1;
//           currentMonth = 0;
//         }
//       }
//     }
//
//     return months;
//   }
//
//
//       $scope.model = {
//         calendar: [],
//         idx: 0,
//         atStart: null,
//         atEnd: null
//       };
//
//       $scope.CALENDAR = CALENDAR;
//
//       $scope.callback = $scope.eventClick || function () {
//           console.warn('No callback function provided');
//         };
//
//       $scope.$watch('eventData', function (newVal) {
//         var data = newVal || [];
//         var events = processData(data);
//         var calendar = generateCalendar(events);
//
//         $scope.model.calendar = calendar;
//
//         updateStartEnd();
//       }, true);
//
//       $scope.previousMonth = function () {
//         $scope.model.idx -= 1;
//
//         updateStartEnd();
//       };
//
//       $scope.nextMonth = function () {
//         $scope.model.idx += 1;
//
//         updateStartEnd();
//       };
//
//       function updateStartEnd() {
//         $scope.model.atStart = $scope.model.idx === 0;
//         $scope.model.atEnd = $scope.model.calendar.length === 0 || $scope.model.idx === $scope.model.calendar.length - 1;
//       }
//     }
//   };
//
// }]);