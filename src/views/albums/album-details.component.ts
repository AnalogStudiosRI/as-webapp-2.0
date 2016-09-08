import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlbumInterface, AlbumsService } from '../../services/albums.service';

@Component({
  selector: 'albums-detailed',
  templateUrl: './album-details.html',
  styleUrls: [ './albums.less' ]
})

export class AlbumsViewDetailsComponent extends OnInit {
  //TODO any - https://thegreenhouse.atlassian.net/browse/AS-246
  private activeRouteSubscriber: any;
  private album: AlbumInterface;

  constructor(private ActivatedRoute: ActivatedRoute, private AlbumsService: AlbumsService) {
    super();
  }

  ngOnInit(): void {
    this.activeRouteSubscriber = this.ActivatedRoute.params.subscribe((params) => {
      let eventId: number = parseInt(params['id'], 10);

      this.AlbumsService.getAlbum(eventId).subscribe((data: AlbumInterface) => {
        this.album = data;
      });
    });
  }

  ngOnDestroy(): void {
    this.activeRouteSubscriber.unsubscribe();
  }

  public getAlbumDetails(): AlbumInterface {
    return this.album;
  }

}