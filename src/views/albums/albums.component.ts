import { AlbumInterface, AlbumsService } from '../../services/albums.service';
import { CardService } from '../../services/card.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'albums-view',
  templateUrl: './albums.html',
  styleUrls: [ './albums.less' ]
})

export class AlbumsViewComponent implements OnInit {
  private albums: Array<AlbumInterface> = [];

  constructor(private AlbumsService: AlbumsService, private CardService: CardService, private Router: Router){

  }

  ngOnInit(): void {
    this.AlbumsService.getAlbums().subscribe((data: Array<AlbumInterface>) => {
      this.albums = data;
    })
  }

  public getAlbums(): Array<AlbumInterface> {
    return this.albums;
  }

  public onAlbumSelected(selectedIndex: number){
    this.Router.navigate(['albums', this.albums[selectedIndex].id]);
  }

  public getModeledAlbumForCard(album: AlbumInterface) {
    return this.CardService.modelAlbum(album);
  }
}