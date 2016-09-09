import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArtistInterface, ArtistsService } from "../../services/artists.service";

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

  constructor(private ActivatedRoute: ActivatedRoute, private ArtistsService: ArtistsService) {
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

}