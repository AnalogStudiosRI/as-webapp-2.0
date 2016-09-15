import { ActivatedRoute } from '@angular/router';
import { ArtistInterface, ArtistsService } from "../../services/artists.service";
import { CardOptionsInterface, CardService} from "../../services/card.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'artist-details',
  templateUrl: './artist-details.html',
  styleUrls: [ './artists.less' ]
})

export class ArtistDetailsViewComponent extends OnInit {
  //TODO any - https://thegreenhouse.atlassian.net/browse/AS-246
  private activeRouteSubscriber: any;
  private artist: ArtistInterface = {
    name: '',
    bio: '',
    imageUrl: ''
  };

  constructor(private ActivatedRoute: ActivatedRoute, private ArtistsService: ArtistsService, private CardService: CardService) {
    super();
  }

  ngOnInit(): void {
    this.activeRouteSubscriber = this.ActivatedRoute.params.subscribe((params) => {
      let artistId: number = parseInt(params['id'], 10);

      this.ArtistsService.getArtist(artistId).subscribe((data: ArtistInterface) => {
        this.artist = data;
      });
    });
  }

  ngOnDestroy(): void {
    this.activeRouteSubscriber.unsubscribe();
  }

  public getArtistDetails(): ArtistInterface {
    return this.artist;
  }

  public getModeledArtistForCard(): CardOptionsInterface {
    return this.CardService.modelArtist(this.artist);
  }

}