//TODO make an admin module - https://thegreenhouse.atlassian.net/browse/AS-285
import { AdminViewComponent } from './views/admin/admin.component';
import { AdminViewEventsComponent } from './views/admin/admin-events.component';
import { AdminViewPostsComponent } from './views/admin/admin-posts.component';
import { APP_ROUTES } from './routes';
import { AnalyticsService } from './services/analytics.service';
import { AuthenticationService } from './services/authentication.service';
import { BootstrapComponent } from './components/bootstrap/bootstrap.component';
import { BrowserModule } from '@angular/platform-browser';
import { EventsCalendarComponent } from './components/events-calendar/events-calendar.component';
import { EventDetailsViewComponent } from './views/events/event-details.component';
import { EventsService } from './services/events.service';
import { EventsViewComponent } from './views/events/events.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeViewComponent } from './views/home/home.component';
import { HttpModule } from '@angular/http';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';
import { LocalStorage, WEB_STORAGE_PROVIDERS } from 'h5webstorage';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostsService } from './services/posts.service';
import { RouterModule } from '@angular/router';


//TODO EventsCalendarComponent and PostsListComponent?
//Is this still good for module bundling by putting everything here
//or does angular / webpack still optimize?
@NgModule({
  imports: [ //modules
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  declarations: [ //component and directives, order matters!! )for now)
    EventsCalendarComponent,
    PostsListComponent,

    FooterComponent,
    HeaderComponent,

    EventDetailsViewComponent,
    EventsViewComponent,
    HomeViewComponent,
    AdminViewEventsComponent,
    AdminViewPostsComponent,
    AdminViewComponent,
    BootstrapComponent
  ],
  bootstrap: [ BootstrapComponent ],  //root component
  providers: [ //services (eg. @injectables)
    AnalyticsService,
    LocalStorage,
    WEB_STORAGE_PROVIDERS,
    AuthenticationService,
    EventsService,
    JwtHelper,
    PostsService
  ]
})

class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);