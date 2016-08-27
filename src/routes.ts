//https://medium.com/@blacksonic86/upgrading-to-the-new-angular-2-router-255605d9da26#.eim0w3smc
//http://angular-2-training-book.rangle.io/handout/routing/child_routes.html
import { AdminViewComponent } from './views/admin/admin.component';
import { AdminViewEventsComponent } from './views/admin/admin-events.component';
import { AdminViewPostsComponent } from "./views/admin/admin-posts.component";
import { HomeViewComponent } from './views/home/home.component';
import { EventsViewComponent } from './views/events/events.component';
import { EventDetailsViewComponent } from './views/events/event-details.component';
import { Routes, RouterModule} from '@angular/router';

//TODO <any>
const appRoutes: Routes = [
  { path: '', component: <any>HomeViewComponent, terminal: true },
  // { path: 'admin', component: <any> AdminViewComponent, children: [
  //   { path: '' },
  //   { path: 'events', component: <any> AdminViewEventsComponent },
  //   { path: 'posts', component: <any> AdminViewPostsComponent }
  // ]},
  // { path: 'events', component: <any> EventsViewComponent },
  // { path: 'events/:id', component: <any> EventDetailsViewComponent },
  { path: 'home', component: <any> HomeViewComponent }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);