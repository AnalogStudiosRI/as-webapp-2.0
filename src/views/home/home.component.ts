import { Component } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { PostsComponent } from '../../components/posts/posts.component';

@Component({
  selector: 'home',
  templateUrl: './src/views/home/home.html',
  styleUrls: ['./node_modules/bootstrap/dist/css/bootstrap.min.css', './src/views/home/home.css'],
  directives: <any>[CalendarComponent, PostsComponent]
})

export class HomeViewComponent { }