import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { FormBuilder, FormGroup, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";

@Component({
  selector: 'contact-view',
  templateUrl: './contact.html',
  styleUrls: [ './contact.scss' ],
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES ],
  providers: [ FormBuilder ],
})

export class ContactViewComponent {
  public contactForm: FormGroup;

  constructor(private FormBuilder: FormBuilder) {
    this.contactForm = this.FormBuilder.group({
      subject: '',
      message: ''
    })
  }

  public contact(): void {
    let subject: string = this.contactForm.controls['subject'].value;
    let message: string = this.contactForm.controls['message'].value;

    console.log('subject', subject);
    console.log('message', message);
  }
}
