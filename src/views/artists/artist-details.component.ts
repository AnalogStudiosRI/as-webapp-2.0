import { ActivatedRoute } from '@angular/router';
import { AlbumInterface, AlbumsService } from '../../services/albums.service';
import { ArtistInterface, ArtistsService } from '../../services/artists.service';
import { CardOptionsInterface, CardService} from '../../services/card.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'artist-details',
  templateUrl: './artist-details.html',
  styleUrls: [ './artists.scss' ]
})

export class ArtistDetailsViewComponent extends OnInit {
  //TODO any - https://thegreenhouse.atlassian.net/browse/AS-246
  private activeRouteSubscriber: any;
  private artistAlbums: Array<AlbumInterface> = [];
  private artist: ArtistInterface = {
    name: '',
    bio: '',
    imageUrl: ''
  };

  constructor(private ActivatedRoute: ActivatedRoute, private ArtistsService: ArtistsService, private AlbumsService: AlbumsService, private CardService: CardService) {
    super();
  }

  ngOnInit(): void {
    this.activeRouteSubscriber = this.ActivatedRoute.params.subscribe((params) => {
      let artistId: number = parseInt(params['id'], 10);

      this.ArtistsService.getArtist(artistId).subscribe((data: ArtistInterface) => {
        this.artist = data;
      });

      this.AlbumsService.getAlbums(artistId).subscribe((data: AlbumInterface[]) => {
        this.artistAlbums = data;
      });
    });
  }

  ngOnDestroy(): void {
    this.activeRouteSubscriber.unsubscribe();
  }

  public getArtistDetails(): ArtistInterface {
    return this.artist;
  }

  public getArtistAlbums(): AlbumInterface[] {
    return this.artistAlbums;
  }

  public getModeledArtistForCard(): CardOptionsInterface {
    return this.CardService.modelArtist(this.artist);
  }

  public getModeledAlbumForCard(album): CardOptionsInterface {
    return this.CardService.modelAlbum(album);
  }

}