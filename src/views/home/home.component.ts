import { Component } from '@angular/core';
import { EventsCalendarComponent } from '../../components/events-calendar/events-calendar.component';
import { PostsComponent } from '../../components/posts-list/posts-list.component';


@Component({
  selector: 'home',
  templateUrl: './src/views/home/home.html',
  styleUrls: ['./node_modules/bootstrap/dist/css/bootstrap.min.css', './src/views/home/home.css'],
  directives: <any>[EventsCalendarComponent, PostsComponent]
})

export class HomeViewComponent { }