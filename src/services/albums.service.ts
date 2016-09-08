import { AuthenticationService } from './authentication.service';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

export interface AlbumInterface {
  id?: number,
  title: string,
  description: string,
  year?: number,
  imageUrl?: string,
  downloadUrl?: string
}

@Injectable()
export class AlbumsService {
  //TODO const
  private API_URL_ALBUMS: string = '/api/albums';

  constructor(private http: Http, private AuthenticationService: AuthenticationService){
  }

  private getOptionsForAuthentication(): RequestOptions{
    let headers = new Headers({'Authorization': 'Bearer ' + this.AuthenticationService.getToken() });
    let options = new RequestOptions({'headers': headers});

    return options;
  }

  //TODO combine?
  public getArtist(artistId: number): Observable<AlbumInterface> {

    return this.http.get(this.API_URL_ALBUMS + '/' + artistId)
      .map((response: Response) => {
        return response.json()[0] || {};
      })
  }

  //TODO combine?
  public getArtists(): Observable<AlbumInterface[]> {

    return this.http.get(this.API_URL_ALBUMS)
      .map((response: Response) => {
        return response.json() || {};
      })
  }

  //TODO any - https://thegreenhouse.atlassian.net/browse/AS-246
  public createArtist(body: AlbumInterface): Observable <any>{

    return this.http.post(this.API_URL_ALBUMS, body, this.getOptionsForAuthentication())
      .map((response: Response) => {
        return response.json || {};
      })
  }

  public updateArtist(artistId: number, body: AlbumInterface): Observable <any>{

    return this.http.put(this.API_URL_ALBUMS + '/' + artistId, body, this.getOptionsForAuthentication())
      .map((response: Response) => {
        return response.json || {};
      })
  }
}