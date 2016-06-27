console.log('ENTER Main');

import { bootstrap }    from '@angular/platform-browser-dynamic';
import { BootstrapComponent } from './components/bootstrap/bootstrap';
import { APP_ROUTER_PROVIDERS } from './routes';

bootstrap(<any> BootstrapComponent, [
  APP_ROUTER_PROVIDERS
])
.catch(err => console.error(err));