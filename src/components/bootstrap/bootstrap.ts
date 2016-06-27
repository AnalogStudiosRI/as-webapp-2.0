console.log('EBTER Bootstrap');

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'as-webapp',
  template: '<div><h1>AnalogStudios</h1><router-outlet></router-outlet></div>',
  directives: [ROUTER_DIRECTIVES]
})

export class BootstrapComponent { }