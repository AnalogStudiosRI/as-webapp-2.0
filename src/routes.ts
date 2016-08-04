import { provideRouter, RouterConfig } from '@angular/router';
import { HomeViewComponent } from './views/home/home.component';

// TODO annotation here?
export const routes: RouterConfig = [
  { path: '', component: <any>HomeViewComponent },
  { path: 'home', component: <any>HomeViewComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];