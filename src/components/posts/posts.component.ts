import {Component, OnInit} from '@angular/core';

//import { PostInterface } from 'post.interface';
import { PostsService } from './posts.service';

@Component({
  selector: 'as-posts',
  templateUrl: './src/components/posts/posts.html',
  styleUrls: ['./src/components/posts/posts.css'],
  providers: <any>[PostsService]
})

export class PostsComponent implements OnInit {
  //TODO set the type here
  private posts;

  constructor(private postsService: PostsService){

  }

  ngOnInit() {
    console.log('ngInit!!!!');
    this.postsService.getPosts().subscribe(response => {
      console.log('POSTS!!!');
      console.log(response);
      this.posts = response;
    })
  }
}