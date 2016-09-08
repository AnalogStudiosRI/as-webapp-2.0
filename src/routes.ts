import { AdminViewComponent } from './views/admin/admin.component';
import { AdminViewManageAlbumsComponent } from './views/admin/manage-albums/manage-albums.component';
import { AdminViewManageArtistsComponent } from './views/admin/manage-artists/manage-artists.component';
import { AdminViewManageEventsComponent } from './views/admin/manage-events/manage-events.component';
import { AdminViewManagePostsComponent } from "./views/admin/manage-posts/manage-posts.component";
import { ArtistsViewComponent } from './views/artists/artists.component';
import { ArtistDetailsViewComponent } from './views/artists/artist-details.component';
import { HomeViewComponent } from './views/home/home.component';
import { EventsViewComponent } from './views/events/events.component';
import { EventDetailsViewComponent } from './views/events/event-details.component';
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', component: <any>HomeViewComponent, terminal: true },
  { path: 'admin', component: <any> AdminViewComponent, children: [
    { path: '' },
    { path: 'albums', component: <any> AdminViewManageAlbumsComponent },
    { path: 'artists', component: <any> AdminViewManageArtistsComponent },
    { path: 'events', component: <any> AdminViewManageEventsComponent },
    { path: 'posts', component: <any> AdminViewManagePostsComponent }
  ]},
  { path: 'artists', component: <any> ArtistsViewComponent },
  { path: 'artists/:id', component: <any> ArtistDetailsViewComponent },
  { path: 'events', component: <any> EventsViewComponent },
  { path: 'events/:id', component: <any> EventDetailsViewComponent },
  { path: 'home', component: <any> HomeViewComponent }
];