import { Component, OnInit } from '@angular/core';
import { PostInterface } from './post.interface';
import { PostsService } from './posts.service';

@Component({
  selector: 'as-posts',
  templateUrl: './src/components/posts/posts.html',
  styleUrls: ['./src/components/posts/posts.css'],
  providers: <any>[PostsService]
})

export class PostsComponent implements OnInit {
  private MAX_POSTS: number = 2;
  private posts: Array<PostInterface> = [];

  constructor(private PostsService: PostsService){
  }

  ngOnInit(): void {
    this.PostsService.getPosts().subscribe(data => {
      this.posts = data;
    })
  }

  getMaxPosts(): number {
    return this.MAX_POSTS;
  }
}