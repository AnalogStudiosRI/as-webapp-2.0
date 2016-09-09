import { ArtistInterface, ArtistsService } from '../../services/artists.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'artists-view',
  templateUrl: './artists.html',
  styleUrls: [ './artists.less' ]
})

export class ArtistsViewComponent implements OnInit {
  private artists: Array<ArtistInterface> = [];

  constructor(private Router: Router, private ArtistsService: ArtistsService){

  }

  ngOnInit(): void {
    this.ArtistsService.getArtists().subscribe((data: Array<ArtistInterface>) => {
      this.artists = data;
    })
  }

  private gotoAlbumDetailsView(albumId: number) {
    this.Router.navigate(['artists', albumId]);
  }

  public getArtists(): Array<ArtistInterface> {
    return this.artists;
  }

  public onArtistSelected(selectedIndex: number){
    this.gotoAlbumDetailsView(this.artists[selectedIndex].id);
  }

  public onArtistClicked(artist: ArtistInterface){
    this.gotoAlbumDetailsView(artist.id);
  }
}