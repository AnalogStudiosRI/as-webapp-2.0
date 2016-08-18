import { AuthenticationService } from "../authentication/authentication.service";
import { Component, ViewContainerRef } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ROUTER_DIRECTIVES } from '@angular/router';

//TODO global bootstrap CSS??
@Component({
  selector: 'as-webapp',
  templateUrl: './src/components/bootstrap/bootstrap.html',
  directives: <any>[ROUTER_DIRECTIVES, HeaderComponent, FooterComponent],
  providers: [ AuthenticationService ]
})

export class BootstrapComponent {
  // public constructor(viewContainerRef: ViewContainerRef) {
  //   // You need this small hack in order to catch application root view container ref
  //   this.viewContainerRef = ViewContainerRef;
  //
  // }
}