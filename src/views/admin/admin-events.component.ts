import { CKEditor } from 'ng2-ckeditor';
import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common'
import { EventInterface } from '../../components/events-calendar/event.interface';
import { EventsService } from '../../components/events-calendar/events.service';
import { FormBuilder, FormGroup, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { TimepickerComponent } from 'ng2-bootstrap';

@Component({
  selector: 'admin-events',
  templateUrl: './src/views/admin/admin-events.html',
  styleUrls: [ './src/views/admin/admin.css' ],
  providers: [ EventsService, FormBuilder ],
  directives: [ CKEditor, CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, TimepickerComponent ]
})

export class AdminViewEventsComponent extends OnInit {
  private events: Array<EventInterface> = [];
  private pristineEvent: EventInterface = {
    id: null,
    title: '',
    description: '',
    startTime: 0,
    endTime: 0,
    createdTime: 0
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
  private getStartTimeAsDateTimeLocal(date: Date): string {
    let monthFormatted: string = ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1).toString();
    let dateFormatted: string = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString();
    let hoursFormatted: string = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()).toString();
    let minutesFormatted: string = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()).toString();

    return date.getFullYear() + '-' + monthFormatted + '-' + dateFormatted + 'T' + hoursFormatted + ':' + minutesFormatted;
  }

  private setEventFormGroup(event: EventInterface): void  {
    let startDay: Date = event.startTime ? new Date(event.startTime * 1000) : new Date();

    this.eventForm = this.FormBuilder.group({
      id: event.id || null,
      title: event.title || '',
      description: event.description || '',
      startTime: this.getStartTimeAsDateTimeLocal(startDay)
    })
  }

  private submitEvent(){}
  public getEvents(): Array<EventInterface> {
    return this.events;
  }

  public onEventSelected(index: number): void {
    let event = this.events[index];

    this.setEventFormGroup(event);
  }

  public submitForm(): void {
    console.log('submitForm', this.eventForm.controls);
    let controls = this.eventForm.controls;

    if(!controls['id'].value) {
      //TODO modal
      console.log('ADD and Then Refresh');
      this.EventsService.addEvent({
        title: controls['title'].value,
        description: controls['title'].value,
        endTime: controls['startTime'].value,
        startTime: controls['startTime'].value
      }).subscribe((response) => {
        console.log('addEvent sucess and refresh!', response);
      }, (error) => {
        console.error('addEvent failure!', error);
      });
    }else{
      //TODO modal
      console.log('Update and Then Refresh');
    }
  }

}