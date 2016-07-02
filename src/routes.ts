import { provideRouter, RouterConfig } from '@angular/router';
import { HomeView } from './views/home/home';

// TODO annotation here?
export const routes: RouterConfig = [
  { path: '', component: <any>HomeView },
  { path: 'home', component: <any>HomeView }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
