import { provideRouter, RouterConfig } from '@angular/router';
import { HomeViewComponent } from './views/home/home.component';
import { EventsViewComponent } from './views/events/events.component';
import { EventsDetailedViewComponent } from './views/events/events-detailed.component';

// TODO annotation here?
export const routes: RouterConfig = [
  { path: '', component: <any>HomeViewComponent },
  { path: 'home', component: <any>HomeViewComponent },
  { path: 'events', component: <any>EventsViewComponent },
  { path: 'events/:id', component: <any>EventsDetailedViewComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];