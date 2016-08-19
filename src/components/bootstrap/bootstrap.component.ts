import { AuthenticationService } from "../../services/authentication.service";
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ROUTER_DIRECTIVES } from '@angular/router';

//TODO global bootstrap CSS??, all services?
@Component({
  selector: 'as-webapp',
  templateUrl: './src/components/bootstrap/bootstrap.html',
  directives: <any>[ROUTER_DIRECTIVES, HeaderComponent, FooterComponent],
  providers: [ AuthenticationService ]
})

export class BootstrapComponent {
}