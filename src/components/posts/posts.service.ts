import { Http, Response } from '@angular/http';
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
    return this.http.get(this.postsApiUrl)
      .map((response: Response) => {
        return response.json() || {};
      }).catch(() => {
        console.log('catch');
        return Observable.throw('Observable thrown');
      });
  }
}