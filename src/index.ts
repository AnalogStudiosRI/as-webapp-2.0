//TODO make an admin module - https://thegreenhouse.atlassian.net/browse/AS-285
import { AlbumsService } from './services/albums.service';
import { AlbumsViewComponent } from './views/albums/albums.component';
import { AlbumsViewDetailsComponent } from './views/albums/album-details.component';
import { AdminViewComponent } from './views/admin/admin.component';
import { AdminViewManageAlbumsComponent } from './views/admin/manage-albums/manage-albums.component';
import { AdminViewManageArtistsComponent } from './views/admin/manage-artists/manage-artists.component';
import { AdminViewManageEventsComponent } from './views/admin/manage-events/manage-events.component';
import { AdminViewManagePostsComponent } from './views/admin/manage-posts/manage-posts.component';
import { AnalyticsService } from './services/analytics.service';
import { APP_ROUTES } from './routes';
import { ArtistsService } from './services/artists.service';
import { ArtistsViewComponent } from './views/artists/artists.component';
import { ArtistDetailsViewComponent } from './views/artists/artist-details.component';
import { AuthenticationService } from './services/authentication.service';
import { BootstrapComponent } from './components/bootstrap/bootstrap.component';
import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from './components/card/card.component';
import { CardService } from './services/card.service';
import { CKEditorModule } from 'ng2-ckeditor';
import { ContactViewComponent } from './views/contact/contact.component';
import { ContactService } from './services/contact.service';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { EventsCalendarComponent } from './components/events-calendar/events-calendar.component';
import { EventsViewDetailsComponent } from './views/events/event-details.component';
import { EventsService } from './services/events.service';
import { EventsViewComponent } from './views/events/events.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeViewComponent } from './views/home/home.component';
import { HttpModule } from '@angular/http';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';
import { LocalStorage, WEB_STORAGE_PROVIDERS } from 'h5webstorage';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostsService } from './services/posts.service';
import { RouterModule } from '@angular/router';
import { SocialShareComponent } from './components/social-share/social-share.component';

//TODO EventsCalendarComponent and PostsListComponent?
//Is this still good for module bundling by putting everything here
//or does angular / webpack still optimize?
@NgModule({
  imports: [ //modules
    BrowserModule,
    CKEditorModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  declarations: [ //component and directives, order matters!! (for now)
    CardComponent,
    EllipsisPipe,
    EventsCalendarComponent,
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
    PostsListComponent,
    SocialShareComponent,

    BootstrapComponent,
    AdminViewManageAlbumsComponent,
    AdminViewManageArtistsComponent,
    AdminViewManageEventsComponent,
    AdminViewManagePostsComponent,
    AdminViewComponent,
    AlbumsViewComponent,
    AlbumsViewDetailsComponent,
    ArtistsViewComponent,
    ArtistDetailsViewComponent,
    ContactViewComponent,
    EventsViewDetailsComponent,
    EventsViewComponent,
    HomeViewComponent
  ],
  bootstrap: [ BootstrapComponent ],  //root component
  providers: [ //services (eg. @injectables)
    AlbumsService,
    AnalyticsService,
    ArtistsService,
    AuthenticationService,
    CardService,
    ContactService,
    EventsService,
    JwtHelper,
    LocalStorage,
    PostsService,
    WEB_STORAGE_PROVIDERS
  ]
})

class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);