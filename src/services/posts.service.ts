import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

export interface PostInterface {
  id?: number,
  title: string
  summary: string,
  createdTime?: number,
}

@Injectable()
export class PostsService {
  private postsApiUrl: string = '/api/posts';

  constructor(private http: Http) {
  }

  getPosts(): Observable<PostInterface[]> {
    return this.http.get(this.postsApiUrl)
      .map((response: Response) => {
        return response.json() || {};
      });
  }
}