import { APP_ROUTER_PROVIDERS } from './routes';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { BootstrapComponent } from './components/bootstrap/bootstrap.component';
import { HTTP_PROVIDERS } from '@angular/http';
//http://stackoverflow.com/questions/34496514/ngmodel-no-value-accessor-for
import { disableDeprecatedForms, provideForms } from "@angular/forms";

bootstrap(<any> BootstrapComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  disableDeprecatedForms(),
  provideForms()
])
.catch(err => console.error(err));