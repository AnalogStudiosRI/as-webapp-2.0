import { Component, ViewEncapsulation } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';


//TODO global bootstrap CSS??, all services?
@Component({
  selector: 'as-webapp',
  templateUrl: './bootstrap.html',
  styleUrls: [ './bootstrap.scss' ],
  encapsulation: ViewEncapsulation.None
})

export class BootstrapComponent {

  constructor(private AnalyticsService: AnalyticsService){
    AnalyticsService.initAnalytics();
  }

}