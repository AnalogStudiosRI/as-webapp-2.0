import { AuthenticationService } from '../services/authentication.service';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

export interface PostInterface {
  id?: number,
  title: string
  summary: string
}

@Injectable()
export class PostsService {
  private postsApiUrl: string = '/api/posts';

  constructor(private AuthenticationService: AuthenticationService, private http: Http) {
  }

  private getOptionsForAuthentication(): RequestOptions{
    let headers = new Headers({'Authorization': 'Bearer ' + this.AuthenticationService.getToken() });
    let options = new RequestOptions({'headers': headers});

    return options;
  }

  public getPosts(): Observable<PostInterface[]> {

    return this.http.get(this.postsApiUrl)
      .map((response: Response) => {
        return response.json() || {};
      });
  }

  public createPost(body: PostInterface): Observable<PostInterface[]> {

    return this.http.post(this.postsApiUrl, body, this.getOptionsForAuthentication())
      .map((response: Response) => {
        return response.json() || {};
      });
  }

  public updatePost(postId: number, body: PostInterface): Observable<PostInterface[]> {

    return this.http.put(this.postsApiUrl + '/' + postId, body, this.getOptionsForAuthentication())
      .map((response: Response) => {
        return response.json() || {};
      });
  }
}