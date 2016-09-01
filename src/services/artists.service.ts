import { AuthenticationService } from './authentication.service';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

export interface ArtistInterface {
  id?: number,
  bio: string,
  name: string,
  imageUrl?: string,
  genre?: string,
  location?: string,
  label?: string,
  contactPhone?: number,
  contactEmail?: string,
  isActive?: boolean
}

@Injectable()
export class ArtistsService {
  private API_URL_ARTISTS: string = '/api/artists';

  constructor(private http: Http, private AuthenticationService: AuthenticationService){
  }

  private getOptionsForAuthentication(): RequestOptions{
    let headers = new Headers({'Authorization': 'Bearer ' + this.AuthenticationService.getToken() });
    let options = new RequestOptions({'headers': headers});

    return options;
  }

  //TODO combine?
  public getArtist(artistId: number): Observable<ArtistInterface> {

    return this.http.get(this.API_URL_ARTISTS + '/' + artistId)
      .map((response: Response) => {
        return response.json()[0] || {};
      })
  }

  //TODO combine?
  public getArtists(): Observable<ArtistInterface[]> {

    return this.http.get(this.API_URL_ARTISTS)
      .map((response: Response) => {
        return response.json() || {};
      })
  }

  //TODO any - https://thegreenhouse.atlassian.net/browse/AS-246
  public createArtist(body: ArtistInterface): Observable <any>{

    return this.http.post(this.API_URL_ARTISTS, body, this.getOptionsForAuthentication())
      .map((response: Response) => {
        return response.json || {};
      })
  }

  public updateArtist(artistId: number, body: ArtistInterface): Observable <any>{

    return this.http.put(this.API_URL_ARTISTS + '/' + artistId, body, this.getOptionsForAuthentication())
      .map((response: Response) => {
        return response.json || {};
      })
  }
}