import { Injectable } from '@angular/core';
import { ArtistInterface } from './artists.service';

export interface CardOptionsInterface {
  imagePath: string;
  headingText: string;
  bodyText: string,
  imageAltText?: string;
  link?: string;
}

@Injectable()
export class CardService {
  constructor() {}

  public modelArtist(artist: ArtistInterface): CardOptionsInterface {
    return {
      imagePath: artist ? artist.imageUrl : '',
      headingText: artist ? artist.name : '',
      bodyText: artist ? artist.bio : '',
      imageAltText: artist ? artist.name : '',
      link: artist ? '/artists/' + artist.id : ''
    }
  }
}