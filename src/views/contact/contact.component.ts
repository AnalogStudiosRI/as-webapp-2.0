import { ContactInterface, ContactService } from '../../services/contact.services';
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
  private pristineContactInfo: ContactInterface = {
    subject: '',
    message: ''
  };

  constructor(private ContactService: ContactService, private FormBuilder: FormBuilder) {
    this.setContactFormGroup(this.pristineContactInfo);
  }

  private setContactFormGroup(contactInfo: ContactInterface): void  {
    this.contactForm = this.FormBuilder.group({
      subject: contactInfo.subject || '',
      message: contactInfo.message || ''
    })
  }

  public contact(): void {
    let subject: string = this.contactForm.controls['subject'].value;
    let message: string = this.contactForm.controls['message'].value;

    console.log('subject', subject);
    console.log('message', message);
    this.ContactService.contact({
      subject: subject,
      message: message
    }).subscribe(() => {
      console.log('success');
      this.setContactFormGroup(this.pristineContactInfo);
    }, (error) => {
      console.log('error');
      this.setContactFormGroup(this.pristineContactInfo);
    })
  }
}
