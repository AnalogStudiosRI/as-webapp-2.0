import { Component } from '@angular/core';
import { EventsCalendarComponent } from '../../components/events-calendar/events-calendar.component';
import { PostsComponent } from '../../components/posts-list/posts-list.component';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: [ './home.less' ],
  directives: <any>[EventsCalendarComponent, PostsComponent]
})


export class HomeViewComponent { }