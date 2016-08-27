console.log('ENTER header.component.ts file');

import { Component } from '@angular/core';

@Component({
  selector: 'as-header',
  templateUrl: './header.html',
  styleUrls: [ './header.less' ]
})


export class HeaderComponent {
  constructor() {
    console.log('ENTER HeaderComponent constructor');
  }
}