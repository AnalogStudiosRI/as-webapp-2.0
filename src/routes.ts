//https://medium.com/@blacksonic86/upgrading-to-the-new-angular-2-router-255605d9da26#.eim0w3smc
import { provideRouter } from '@angular/router';
import { HomeViewComponent } from './views/home/home.component';
import { EventsViewComponent } from './views/events/events.component';
import { EventDetailsViewComponent } from './views/events/event-details.component';

//TODO any
export const appRoutes: any = [
  { path: '', component: <any>HomeViewComponent, terminal: true },
  { path: 'events', name: 'EventsView', component: <any>EventsViewComponent },
  { path: 'events/:id', name: 'EventsDetailedView', component: <any>EventDetailsViewComponent },
  { path: 'home', name: 'HomeView', component: <any>HomeViewComponent, useAsDefault: true }
];

export const APP_ROUTER_PROVIDERS = provideRouter(appRoutes);