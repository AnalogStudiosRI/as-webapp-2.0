import { APP_ROUTER_PROVIDERS } from './routes';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { BootstrapComponent } from './components/bootstrap/bootstrap.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { LocalStorageService, LocalStorageSubscriber } from 'angular2-localstorage/LocalStorageEmitter';
import { provideForms } from '@angular/forms';

// TODO HTTP_PROVIDERS, provideForms warnings - https://thegreenhouse.atlassian.net/browse/AS-245
// TODO bootstrap - https://thegreenhouse.atlassian.net/browse/AS-246
let appPromise = bootstrap(<any> BootstrapComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provideForms(),
  LocalStorageService
])
.catch(err => console.error(err));

LocalStorageSubscriber(appPromise);