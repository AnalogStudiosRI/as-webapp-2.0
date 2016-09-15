import { Injectable } from '@angular/core';
import { AlbumInterface } from './albums.service';
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

  public modelAlbum(album: AlbumInterface): CardOptionsInterface {
    return {
      imagePath: album ? album.imageUrl : '',
      headingText: album ? album.title : '',
      bodyText: album ? album.description : '',
      imageAltText: album ? album.title : '',
      link: album ? '/albums/' + album.id : ''
    }
  }

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