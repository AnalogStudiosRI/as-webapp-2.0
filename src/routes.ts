//https://medium.com/@blacksonic86/upgrading-to-the-new-angular-2-router-255605d9da26#.eim0w3smc
//http://angular-2-training-book.rangle.io/handout/routing/child_routes.html
import { provideRouter } from '@angular/router';
import { AdminViewComponent } from './views/admin/admin.component';
import { AdminViewEventsComponent } from './views/admin/admin-events.component';
import { AdminViewPostsComponent } from "./views/admin/admin-posts.component";
import { HomeViewComponent } from './views/home/home.component';
import { EventsViewComponent } from './views/events/events.component';
import { EventDetailsViewComponent } from './views/events/event-details.component';

//TODO <any>
export const appRoutes: any = [
  { path: '', component: <any>HomeViewComponent, terminal: true },
  { path: 'admin', name: 'AdminView', component: <any> AdminViewComponent, children: [
    { path: '' },
    { path: 'events', component: <any> AdminViewEventsComponent },
    { path: 'posts', component: <any> AdminViewPostsComponent }
  ]},
  { path: 'events', name: 'EventsView', component: <any> EventsViewComponent },
  { path: 'events/:id', name: 'EventsDetailedView', component: <any> EventDetailsViewComponent },
  { path: 'home', name: 'HomeView', component: <any> HomeViewComponent, useAsDefault: true }
];

export const APP_ROUTER_PROVIDERS = provideRouter(appRoutes);