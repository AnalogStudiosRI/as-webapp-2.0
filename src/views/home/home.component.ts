import { Component } from '@angular/core';

import { PostsComponent } from '../../components/posts/posts.component';
import { PostsService } from "../../components/posts/posts.service";

@Component({
  selector: 'home',
  templateUrl: './src/views/home/home.html',
  styleUrls: ['./node_modules/bootstrap/dist/css/bootstrap.min.css', './src/views/home/home.css'],
  directives: <any>[PostsComponent]
})

export class HomeViewComponent { }