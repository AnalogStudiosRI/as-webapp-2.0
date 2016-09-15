import { ArtistInterface, ArtistsService } from '../../services/artists.service';
import { CardService } from '../../services/card.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'artists-view',
  templateUrl: './artists.html',
  styleUrls: [ './artists.less' ]
})

export class ArtistsViewComponent implements OnInit {
  private artists: Array<ArtistInterface> = [];

  constructor(private Router: Router, private ArtistsService: ArtistsService, private CardService: CardService){
  }

  ngOnInit(): void {
    this.ArtistsService.getArtists().subscribe((data: Array<ArtistInterface>) => {
      this.artists = data;
    })
  }

  public getArtists(): Array<ArtistInterface> {
    return this.artists;
  }

  public onArtistSelected(selectedIndex: number){
    this.Router.navigate(['artists', this.artists[selectedIndex].id]);
  }

  public getModeledArtistForCard(artist: ArtistInterface) {
    return this.CardService.modelArtist(artist);
  }
}