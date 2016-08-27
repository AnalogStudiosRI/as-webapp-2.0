//TODO make an admin module - https://thegreenhouse.atlassian.net/browse/AS-285
import { Http } from '@angular/http';
import { AppRoutes } from './routes';
import { NgModule } from '@angular/core';
import { BootstrapComponent } from './components/bootstrap/bootstrap.component';
import { BrowserModule } from '@angular/platform-browser';
import { EventsCalendarComponent } from './components/events-calendar/events-calendar.component';
import { EventsService } from './services/events.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeViewComponent } from './views/home/home.component';
import { ROUTER_DIRECTIVES } from '@angular/router';

//RouterModule.forRoot(routerConfig),
@NgModule({
  imports: [ BrowserModule /*, RouterLink, , Http*/ ],  //modules, 3rd party
  declarations: [ ROUTER_DIRECTIVES, BootstrapComponent, HeaderComponent, FooterComponent /*, ROUTER_DIRECTIVES , FooterComponent, EventsCalendarComponent*/ ],  //component and directives
  bootstrap: [ BootstrapComponent ]  //root component
  //providers: [ AppRoutes ] //services (eg. @injectables)
})

export class AppModule { }