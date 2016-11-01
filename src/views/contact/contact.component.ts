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
  private messageSent: boolean = false;
  private messageSuccess: boolean = false;
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
    this.messageSent = false;
    this.messageSuccess = false;

    let subject: string = this.contactForm.controls['subject'].value;
    let message: string = this.contactForm.controls['message'].value;

    this.ContactService.contact({
      subject: subject,
      message: message
    }).subscribe(() => {
      this.messageSent = true;
      this.messageSuccess = true;
      this.setContactFormGroup(this.pristineContactInfo);
    }, (error) => {
      console.error('error', error);
      this.setContactFormGroup(this.pristineContactInfo);
    })
  }

  public hasMessageBeenSent(): boolean {
    return this.messageSent;
  }
  public wasMessageSuccessful(): boolean {
    return this.messageSuccess;
  }
}
