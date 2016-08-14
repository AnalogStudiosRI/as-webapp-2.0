import { provideRouter, RouterConfig } from '@angular/router';
import { HomeViewComponent } from './views/home/home.component';
import { EventsViewComponent } from './views/events/events.component';

// TODO annotation here?
export const routes: RouterConfig = [
  { path: '', component: <any>HomeViewComponent },
  { path: 'home', component: <any>HomeViewComponent },
  { path: 'events', component: <any>EventsViewComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];