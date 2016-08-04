import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'as-webapp',
  templateUrl: './src/components/bootstrap/bootstrap.html',
  directives: <any>[ROUTER_DIRECTIVES, HeaderComponent, FooterComponent]
})

export class BootstrapComponent { }