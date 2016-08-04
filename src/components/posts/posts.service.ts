import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { PostInterface } from './post.interface';

@Injectable()
export class PostsService {
  private postsApiUrl: string = '/api/posts';

  constructor(private http: Http) {
  }


  //getPosts() {
  getPosts(): Observable<PostInterface[]> {
    console.log('GET POSTS!!!');
    return this.http.get(this.postsApiUrl)
      .map(() => {
        console.log('map function');
      }).catch(() => {
        console.log('catch');
        return Observable.throw('Observable thrown');
      });
  }
}