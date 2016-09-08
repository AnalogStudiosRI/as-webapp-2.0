import { AlbumInterface, AlbumsService } from '../../services/albums.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'albums-view',
  templateUrl: './albums.html',
  styleUrls: [ './albums.less' ]
})

export class AlbumsViewComponent implements OnInit {
  private albums: Array<AlbumInterface> = [];

  constructor(private Router: Router, private AlbumsService: AlbumsService){

  }

  ngOnInit(): void {
    this.AlbumsService.getAlbums().subscribe((data: Array<AlbumInterface>) => {
      this.albums = data;
    })
  }

  private gotoAlbumDetailsView(albumId: number) {
    this.Router.navigate(['albums', albumId]);
  }

  public getAlbums(): Array<AlbumInterface> {
    return this.albums;
  }

  public onAlbumSelected(selectedIndex: number){
    this.gotoAlbumDetailsView(this.albums[selectedIndex].id);
  }

  public onAlbumClicked(album: AlbumInterface){
    this.gotoAlbumDetailsView(album.id);
  }
}