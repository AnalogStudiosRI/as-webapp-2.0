//https://medium.com/@blacksonic86/upgrading-to-the-new-angular-2-router-255605d9da26#.eim0w3smc
//http://angular-2-training-book.rangle.io/handout/routing/child_routes.html
import { AdminViewComponent } from './views/admin/admin.component';
import { AdminViewArtistsComponent } from './views/admin/admin-artists.component';
import { AdminViewEventsComponent } from './views/admin/admin-events.component';
import { AdminViewPostsComponent } from "./views/admin/admin-posts.component";
import { ArtistsViewComponent } from './views/artists/artists.component';
import { HomeViewComponent } from './views/home/home.component';
import { EventsViewComponent } from './views/events/events.component';
import { EventDetailsViewComponent } from './views/events/event-details.component';
import { Routes } from '@angular/router';


export const APP_ROUTES: Routes = [
  { path: '', component: <any>HomeViewComponent, terminal: true },
  { path: 'admin', component: <any> AdminViewComponent, children: [
    { path: '' },
    { path: 'artists', component: <any> AdminViewArtistsComponent },
    { path: 'events', component: <any> AdminViewEventsComponent },
    { path: 'posts', component: <any> AdminViewPostsComponent }
  ]},
  { path: 'artists', component: <any> ArtistsViewComponent },
  { path: 'events', component: <any> EventsViewComponent },
  { path: 'events/:id', component: <any> EventDetailsViewComponent },
  { path: 'home', component: <any> HomeViewComponent }
];