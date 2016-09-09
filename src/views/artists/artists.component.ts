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

  public getAlbums(): Array<ArtistInterface> {
    return this.artists;
  }

  public onAlbumSelected(selectedIndex: number){
    this.gotoAlbumDetailsView(this.artists[selectedIndex].id);
  }

  public onAlbumClicked(artist: ArtistInterface){
    this.gotoAlbumDetailsView(artist.id);
  }
}