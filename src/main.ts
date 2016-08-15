import { APP_ROUTER_PROVIDERS } from './routes';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { BootstrapComponent } from './components/bootstrap/bootstrap.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideForms } from '@angular/forms';

// TODO HTTP_PROVIDERS warning
// TODO bootstrap
bootstrap(<any> BootstrapComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provideForms()
])
.catch(err => console.error(err));