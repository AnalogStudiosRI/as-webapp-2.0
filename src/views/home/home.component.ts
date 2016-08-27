import { Component } from '@angular/core';
import { EventsCalendarComponent } from '../../components/events-calendar/events-calendar.component';
import { PostsListComponent } from '../../components/posts-list/posts-list.component';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: [ './home.less' ],
  directives: <any>[ EventsCalendarComponent, PostsListComponent ]
})

export class HomeViewComponent { }