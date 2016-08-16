import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common'
import { EventInterface } from '../../components/events-calendar/event.interface';
import { EventsService } from '../../components/events-calendar/events.service';
import { FormBuilder, FormGroup, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

@Component({
  selector: 'admin-events',
  templateUrl: './src/views/admin/admin-events.html',
  styleUrls: [ './src/view/admin/admin.css' ],
  providers: [ EventsService, FormBuilder ],
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES ]
})

export class AdminViewEventsComponent extends OnInit {
  private events: Array<EventInterface> = [];
  public event: FormGroup;

  constructor(private EventsService: EventsService, private FormBuilder: FormBuilder){
    super();
    //TODO map to EventInterface???
    this.event = this.FormBuilder.group({
      id: null,
      title: '',
      description: '',
      startTime: null,
      endTime: null
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

  public onSelected(index: number): void {
    console.log('eventSelected', index);
    let event = this.events[index];

    //this.event.controls['id'].value.set(event.id);
    //this.event.controls['title'].value = event.title);
    console.log(this.event);
  }

  public submitForm(): void {
    console.log('submitForm', this.event.controls);
  }

}