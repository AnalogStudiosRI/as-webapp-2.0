import { Component } from '@angular/core';
import { NavigationComponent } from '../../components/navigation/navigation.component';

@Component({
  selector: 'as-header',
  templateUrl: './header.html',
  styleUrls: [ './header.less' ],
  directives: [ NavigationComponent ]
})

export class HeaderComponent {}