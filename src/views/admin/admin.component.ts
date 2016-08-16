import { Component, ViewChild } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { AuthenticationService } from '../../components/authentication/authentication.service';
import { FormBuilder, FormGroup, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap/ng2-bootstrap';
//import { ModalDirective } from 'ng2-bootstrap/components/modal';

@Component({
  selector: 'admin-view',
  templateUrl: './src/views/admin/admin.html',
  styleUrls: ['/node_modules/bootstrap/dist/css/bootstrap.min.css', './src/views/admin/admin.css'],
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, MODAL_DIRECTIVES ],
  providers: [ FormBuilder, AuthenticationService ],
  viewProviders: [ BS_VIEW_PROVIDERS ]
})

export class AdminViewComponent {
  public credentials: FormGroup;
  public isAuthenticated: boolean = false;

  // @ViewChild('childModal') public childModal: ModalDirective;
  //
  // public showChildModal():void {
  //   this.childModal.show();
  // }
  //
  // public hideChildModal():void {
  //   this.childModal.hide();
  // }

  //TODO spinner
  constructor(private AuthenticationService: AuthenticationService, private FormBuilder: FormBuilder) {
    this.credentials = this.FormBuilder.group({
      username: '',
      password: ''
    })
  }

  public login(): void {
    let username: string = this.credentials.controls['username'].value;
    let password: string = this.credentials.controls['password'].value;

    this.AuthenticationService.authenticate(username, password).subscribe((isAuthenticated: boolean) => {
      //TODO anything here? spinner?
    },(err) => {
      console.error('login response error', err);
      //TODO modal
    })
  }

  public logout(): void {
    console.log('logout');
    this.AuthenticationService.unauthenticate();
  }

  public getIsAuthenticated(): boolean {
    return this.AuthenticationService.isAuthenticated();
  }

}