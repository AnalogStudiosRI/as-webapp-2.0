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
  styleUrls: [ './src/view/admin/admin.css' ],
  providers: [ EventsService, FormBuilder ],
  directives: [ CKEditor, CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, TimepickerComponent ]
})

export class AdminViewEventsComponent extends OnInit {
  private events: Array<EventInterface> = [];
  public eventForm: FormGroup;

  constructor(private EventsService: EventsService, private FormBuilder: FormBuilder){
    super();
    //TODO map to EventInterface???
    this.eventForm = this.FormBuilder.group({
      id: null,
      title: '',
      description: '',
      startDate: '',
      startTime: ''
    });
  }

  ngOnInit(): void {
    this.EventsService.getEvents().subscribe((data: Array<EventInterface>) => {
      this.events = data;
    })
  }

  public getEvents(): Array<EventInterface> {
    return this.events;
  }

  public onEventSelected(index: number): void {
    let event = this.events[index];

    this.eventForm = this.FormBuilder.group(event);
  }

  public submitForm(): void {
    console.log('submitForm', this.eventForm.controls);
  }

}