import { Component, OnInit } from '@angular/core';
import { PostInterface, PostsService  } from '../../services/posts.service';

@Component({
  selector: 'as-posts-list',
  templateUrl: './posts-list.html',
  styleUrls: [ './posts-list.scss' ]
})

export class PostsListComponent implements OnInit {
  //TODO make constant - https://thegreenhouse.atlassian.net/browse/AS-246
  //TODO make configurable?
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