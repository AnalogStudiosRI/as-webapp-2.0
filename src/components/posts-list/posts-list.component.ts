import { Component, OnInit } from '@angular/core';
import { PostInterface, PostsService  } from '../../services/posts.service';

@Component({
  selector: 'as-posts-list',
  templateUrl: './src/components/posts-list/posts-list.html',
  styleUrls: ['./src/components/posts-list/posts-list.css'],
  providers: <any>[ PostsService ]
})

export class PostsComponent implements OnInit {
  private MAX_POSTS: number = 2;
  private posts: Array<PostInterface> = [];

  constructor(private PostsService: PostsService){
  }

  ngOnInit(): void {
    this.PostsService.getPosts().subscribe(data => {
      this.posts = data;
    }, (err) => {
      console.log('err', err);
      //modal
    })
  }

  getMaxPosts(): number {
    return this.MAX_POSTS;
  }
}