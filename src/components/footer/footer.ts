'use strict';

import { Component } from '@angular/core';

@Component({
  selector: 'as-footer',
  templateUrl: './src/components/footer/footer.html',
  styleUrls: ['./src/components/footer/footer.css']
})

export class FooterComponent {
  private currentYear: string;

  constructor(){
    this.currentYear = new Date().getFullYear().toString();
  }

  getCurrentYear() {
    return this.currentYear;
  }
}