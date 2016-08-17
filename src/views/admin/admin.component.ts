import { AuthenticationService } from '../../components/authentication/authentication.service';
import { Component, ViewChild } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { FormBuilder, FormGroup, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap/ng2-bootstrap';
import { Router } from '@angular/router';
//import { ModalDirective } from 'ng2-bootstrap/components/modal';

@Component({
  selector: 'admin-view',
  templateUrl: './src/views/admin/admin.html',
  styleUrls: ['/node_modules/bootstrap/dist/css/bootstrap.min.css', './src/views/admin/admin.css'],
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, MODAL_DIRECTIVES ],
  providers: [ AuthenticationService, FormBuilder ],
  viewProviders: [ BS_VIEW_PROVIDERS ]
})


export class AdminViewComponent {
  public loginForm: FormGroup;
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
  constructor(private AuthenticationService: AuthenticationService, private FormBuilder: FormBuilder, private Router: Router) {
    this.loginForm = this.FormBuilder.group({
      username: '',
      password: ''
    })
  }

  public login(): void {
    let username: string = this.loginForm.controls['username'].value;
    let password: string = this.loginForm.controls['password'].value;

    this.AuthenticationService.authenticate(username, password).subscribe((isAuthenticated: boolean) => {
      //TODO anything here? spinner?
      //TODO load initial route this.Router.navigate(['../events']);
    },(err) => {
      console.error('login response error', err);
      //TODO modal
    })
  }

  public logout(): void {
    this.AuthenticationService.unauthenticate();
    this.Router.navigate(['admin']);
  }

  public getIsAuthenticated(): boolean {
    return this.AuthenticationService.isAuthenticated();
  }

}