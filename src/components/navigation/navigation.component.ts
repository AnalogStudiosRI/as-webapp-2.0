import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'as-navigation',
  templateUrl: './navigation.html',
  styleUrls: [ './navigation.scss' ]
})

export class NavigationComponent {
  private activeRoute: string = '';

  constructor(private Router: Router) {
    Router.events.filter(event =>
      event instanceof NavigationEnd
    ).subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.activeRoute = event.url.replace('/', '');
      }
    });
  }

  public isCurrentRoute(routePath: string): boolean {
    return this.activeRoute === routePath;
  }

}