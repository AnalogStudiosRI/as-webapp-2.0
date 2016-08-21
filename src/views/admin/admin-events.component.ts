import { CKEditor } from 'ng2-ckeditor';
import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common'
import { EventInterface, EventsService } from '../../services/events.service';
import { FormBuilder, FormGroup, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { TimepickerComponent } from 'ng2-bootstrap';

@Component({
  selector: 'admin-events',
  templateUrl: './admin-events.html',
  //styleUrls: [ './admin.css' ],
  providers: [ EventsService, FormBuilder ],
  directives: [ CKEditor, CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, TimepickerComponent ]
})

export class AdminViewEventsComponent extends OnInit {
  private events: Array<EventInterface> = [];
  private pristineEvent: any = {
    id: null,
    title: '',
    description: '',
    startTime: '',
  };
  public eventForm: FormGroup;

  constructor(private EventsService: EventsService, private FormBuilder: FormBuilder){
    super();
    this.setEventFormGroup(this.pristineEvent);
  }

  ngOnInit(): void {
    this.EventsService.getEvents().subscribe((data: Array<EventInterface>) => {
      this.events = data;
    })
  }

  //yyyy-MM-ddThh:mm
  private getEventStartTimeAsDateTimeLocal(date: Date): string {
    let monthFormatted: string = ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1).toString();
    let dateFormatted: string = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString();
    let hoursFormatted: string = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()).toString();
    let minutesFormatted: string = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()).toString();

    return date.getFullYear() + '-' + monthFormatted + '-' + dateFormatted + 'T' + hoursFormatted + ':' + minutesFormatted;
  }

  //2016-08-27T12:12
  private getCurrentEventStartTimeAsTimestemp(): number {
    let datePieces: Array<string> = this.eventForm.controls['startTime'].value.split('T');
    let dayPieces: Array<string> = datePieces[0].split('-');
    let timePieces: Array<string> = datePieces[1].split(':');

    return new Date(parseInt(dayPieces[0], 10), (parseInt(dayPieces[1], 10) - 1), parseInt(dayPieces[2], 10), parseInt(timePieces[0], 10), parseInt(timePieces[1], 10), 0).getTime() / 1000;
  }

  private setEventFormGroup(event: EventInterface): void  {
    let startDay: Date = event.startTime ? new Date(event.startTime * 1000) : new Date();

    this.eventForm = this.FormBuilder.group({
      id: event.id || null,
      title: event.title || '',
      description: event.description || '',
      startTime: this.getEventStartTimeAsDateTimeLocal(startDay)
    })
  }

  private modelEventsRequestBody(): EventInterface {
    //yes, it is known we are picking the endTime for the user.  it is a required field
    let controls = this.eventForm.controls;

    return {
      title: controls['title'].value,
      description: controls['description'].value,
      endTime: this.getCurrentEventStartTimeAsTimestemp(),
      startTime: this.getCurrentEventStartTimeAsTimestemp()
    }
  }

  private createEvent(): void {
    //TODO modal / error handling - https://thegreenhouse.atlassian.net/browse/AS-250
    let body = this.modelEventsRequestBody();

    this.EventsService.createEvent(body).subscribe(() => {
      this.setEventFormGroup(this.pristineEvent);
    }, (error) => {
      console.error('addEvent failure!', error);
    });
  }

  private updateEvent(): void {
    //TODO modal / error handling - https://thegreenhouse.atlassian.net/browse/AS-250
    let id: number = this.eventForm.controls['id'].value;
    let body: EventInterface = this.modelEventsRequestBody();

    this.EventsService.updateEvent(id, body).subscribe(() => {
      this.setEventFormGroup(this.pristineEvent);
    }, (error) => {
      console.error('Update failure!', error);
    });
  }

  public getEvents(): Array<EventInterface> {
    return this.events;
  }

  public onEventSelected(index: number): void {
    let event = this.events[index];

    this.setEventFormGroup(event);
  }

  public submitForm(): boolean {
    let isUpdatingEvent: boolean = this.eventForm.controls['id'].value ? true : false;

    if(isUpdatingEvent) {
      this.updateEvent();
    } else if(!isUpdatingEvent){
      this.createEvent();
    } else {
      console.error('unable to submit form');
    }

    return false;
  }

}