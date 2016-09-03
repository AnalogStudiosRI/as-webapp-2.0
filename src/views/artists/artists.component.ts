import { Component, OnInit } from '@angular/core';
import {ArtistsService, ArtistInterface} from '../../services/artists.service';

@Component({
  selector: 'artists',
  templateUrl: './artists.html',
  styleUrls: [ './artists.less' ]
})

export class ArtistsViewComponent extends OnInit {
  private artists: Array<ArtistInterface> = [];

  constructor(private ArtistsService: ArtistsService) {
    super();
  }

  ngOnInit(): void {
    this.ArtistsService.getArtists().subscribe((data: Array<ArtistInterface>) => {
      console.log('artists data', data);
      this.artists = data;
    })
  }

  public getArtists(): Array<ArtistInterface> {
    return this.artists;
  }
}