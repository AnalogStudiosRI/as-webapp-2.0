import { Injectable } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

declare var ga, window;

@Injectable()
export class AnalyticsService {
  private prodDomain: string = 'analogstudios.net';
  private isProd: boolean = false;

  constructor(private Router: Router){
    this.setEnvironment();
  }

  private setEnvironment():void {
    this.isProd = window.location.host.indexOf(this.prodDomain) >= 0;
  }

  private setTrackingSubscriber(): void {
    this.Router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {

        ga('send', 'pageview', event.urlAfterRedirects);
      }
    });
  }

  public initAnalytics(): void {
    if(this.isProd){
      this.setTrackingSubscriber();
    }else{
      console.warn('not in production, analytics not running');
    }
  }

}