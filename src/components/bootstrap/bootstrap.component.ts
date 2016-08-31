import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

declare var ga;

//TODO global bootstrap CSS??, all services?
@Component({
  selector: 'as-webapp',
  templateUrl: './bootstrap.html',
  styleUrls: [ './bootstrap.less' ]
})

export class BootstrapComponent {

  private setNavigationEndSubscriber(): void {
    this.Router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {

        ga('send', 'pageview', event.urlAfterRedirects);
      }
    });
  }

  constructor(private Router: Router){
    this.setNavigationEndSubscriber()
  }
}