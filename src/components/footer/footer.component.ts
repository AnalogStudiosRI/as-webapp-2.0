import { Component } from '@angular/core';

@Component({
  selector: 'as-footer',
  templateUrl: './footer.html',
  styleUrls: [ './footer.scss' ]
})

export class FooterComponent {
  private STARTING_YEAR: number = 2007;
  private currentYear: number;

  constructor(){
    this.currentYear = new Date().getFullYear();
  }

  getStartingYear(): number {
    return this.STARTING_YEAR;
  }

  getCurrentYear(): number {
    return this.currentYear;
  }
}