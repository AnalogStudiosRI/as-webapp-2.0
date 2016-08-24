import { AuthenticationService } from '../../services/authentication.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';
import { FooterComponent } from '../../components/footer/footer.component';
import { ROUTER_DIRECTIVES } from '@angular/router';

//TODO global bootstrap CSS??, all services?
@Component({
  selector: 'as-webapp',
  templateUrl: './bootstrap.html',
  //styleUrls: [ './bootstrap.css' ],
  directives: <any>[ROUTER_DIRECTIVES, HeaderComponent, FooterComponent],
  providers: [ AuthenticationService, JwtHelper ]
})

export class BootstrapComponent {}