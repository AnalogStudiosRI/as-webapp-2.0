import { Component, OnInit } from '@angular/core';
import { PostInterface, PostsService  } from '../../services/posts.service';

@Component({
  selector: 'as-posts-list',
  templateUrl: './posts-list.html',
  styleUrls: [ './posts-list.less' ]
})

export class PostsListComponent implements OnInit {
  //TODO make constant - https://thegreenhouse.atlassian.net/browse/AS-246
  //TODO make configurable?
  private MAX_POSTS: number = 2;
  private posts: Array<PostInterface> = [];

  constructor(private PostsService: PostsService){
  }

  ngOnInit(): void {
    this.PostsService.getPosts().subscribe((data: Array<PostInterface>) => {
      this.posts = data.reverse();
    }, (err) => {
      console.error('error', err);
    })
  }

  getMaxPosts(): number {
    return this.MAX_POSTS;
  }
}