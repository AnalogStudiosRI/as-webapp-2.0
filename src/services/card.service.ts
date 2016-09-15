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
  constructor(){}

  public modelArtist(artist: ArtistInterface): CardOptionsInterface {
    return {
      imagePath: artist.imageUrl,
      headingText: artist.name,
      bodyText: artist.bio,
      imageAltText: artist.name,
      link: '/artists/' + artist.id
    }
  }
}