//TODO make an admin module - https://thegreenhouse.atlassian.net/browse/AS-285
import { HttpModule } from '@angular/http';
import { APP_ROUTES } from './routes';
import { NgModule } from '@angular/core';
import { BootstrapComponent } from './components/bootstrap/bootstrap.component';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeViewComponent } from './views/home/home.component';
import { RouterModule } from '@angular/router';
import { AdminViewComponent } from './views/admin/admin.component';
import { AdminViewEventsComponent } from './views/admin/admin-events.component';
import { EventsViewComponent } from './views/events/events.component';
import { EventDetailsViewComponent } from './views/events/event-details.component';
import { AdminViewPostsComponent } from './views/admin/admin-posts.component';
import { AuthenticationService } from './services/authentication.service';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';
import { PostsService } from './services/posts.service';
import { EventsService } from './services/events.service';

//TODO EventsCalendarComponent and PostsListComponent?
//Is this still good for module bundling by putting everything here
//or does angular / webpack still optimize?
@NgModule({
  imports: [ //modules
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  declarations: [ //component and directives
    AdminViewComponent,
    AdminViewEventsComponent,
    AdminViewPostsComponent,
    BootstrapComponent,
    EventDetailsViewComponent,
    EventsViewComponent,
    FooterComponent,
    HeaderComponent,
    HomeViewComponent
  ],
  bootstrap: [ BootstrapComponent ],  //root component
  providers: [ //services (eg. @injectables)
    AuthenticationService,
    EventsService,
    JwtHelper,
    PostsService
  ]
})

export class AppModule { }