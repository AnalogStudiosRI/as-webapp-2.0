import { APP_ROUTER_PROVIDERS } from './routes';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { BootstrapComponent } from './components/bootstrap/bootstrap.component';
import { HTTP_PROVIDERS } from '@angular/http';

bootstrap(<any> BootstrapComponent, [
  APP_ROUTER_PROVIDERS, HTTP_PROVIDERS
])
.catch(err => console.error(err));