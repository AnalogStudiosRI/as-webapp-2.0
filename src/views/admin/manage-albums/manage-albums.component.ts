import { AlbumInterface, AlbumsService } from '../../../services/albums.service';
import { ArtistInterface, ArtistsService } from '../../../services/artists.service';
import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common'
import { FormBuilder, FormGroup, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';


@Component({
  selector: 'admin-view-manage-albums',
  templateUrl: './manage-albums.html',
  styleUrls: [ '../admin.scss' ],
  providers: [ AlbumsService, FormBuilder ],
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES ]
})

export class AdminViewManageAlbumsComponent extends OnInit {
  private isEditing: boolean = false;
  public selectedArtistId: number = null;
  private albums: Array<AlbumInterface> = [];
  private artists: Array<ArtistInterface> = [];
  private pristineAlbum: AlbumInterface = {
    id: null,
    title: '',
    description: '',
    year: null,
    imageUrl: null,
    downloadUrl: null,
    artistId: null
  };
  public albumForm: FormGroup;

  constructor(private AlbumsService: AlbumsService, private ArtistsService: ArtistsService, private FormBuilder: FormBuilder){
    super();
    this.setAlbumFormGroup(this.pristineAlbum);
  }

  ngOnInit(): void {
    this.AlbumsService.getAlbums().subscribe((data: Array<AlbumInterface>) => {
      this.albums = data;
    });

    this.ArtistsService.getArtists().subscribe((data: Array<ArtistInterface>) => {
      this.artists = data;
      this.selectedArtistId = this.artists[0].id;
    });
  }

  private setAlbumFormGroup(album: AlbumInterface): void  {
    this.isEditing = album.id ? true : false;
    this.selectedArtistId = this.isEditing ? this.selectedArtistId : null;

    this.albumForm = this.FormBuilder.group({
      id: album.id || null,
      title: album.title || '',
      description: album.description || '',
      year: album.year || '',
      imageUrl: album.imageUrl || '',
      downloadUrl: album.downloadUrl || '',
      artistId: album.artistId || null
    })
  }

  private modelAlbumsRequestBody(): AlbumInterface {
    let controls = this.albumForm.controls;

    return {
      id: controls['id'].value || null,
      title: controls['title'].value || '',
      description: controls['description'].value || '',
      year: controls['year'].value || '',
      imageUrl: controls['imageUrl'].value || '',
      downloadUrl: controls['downloadUrl'].value || '',
      artistId: this.selectedArtistId || null
    }
  }

  private createAlbum(): void {
    //TODO modal / error handling - https://thegreenhouse.atlassian.net/browse/AS-250
    let body = this.modelAlbumsRequestBody();

    this.AlbumsService.createAlbum(body).subscribe(() => {
      this.setAlbumFormGroup(this.pristineAlbum);
    }, (error) => {
      console.error('addEvent failure!', error);
    });
  }

  private updateAlbum(): void {
    //TODO modal / error handling - https://thegreenhouse.atlassian.net/browse/AS-250
    let id: number = this.albumForm.controls['id'].value;
    let body: AlbumInterface = this.modelAlbumsRequestBody();

    this.AlbumsService.updateAlbum(id, body).subscribe(() => {
      this.setAlbumFormGroup(this.pristineAlbum);
    }, (error) => {
      console.error('Update failure!', error);
    });
  }

  public getAlbums(): Array<AlbumInterface> {
    return this.albums;
  }

  public getArtists(): Array<ArtistInterface> {
    return this.artists;
  }

  public onAlbumSelected(index: number): void {
    let album = this.albums[index];

    this.setAlbumFormGroup(album);
  }


  public onArtistSelected(index: number): void {
    this.selectedArtistId = this.artists[index].id;
  }

  public getIsEditing(): boolean {
    return this.isEditing;
  }

  public getCurrentlySelectedArtistId(): number {
    return this.selectedArtistId;
  }

  public resetForm() {
    this.isEditing = false;
    this.selectedArtistId = null;
  }

  public submitForm(): boolean {

    if(this.isEditing) {
      this.updateAlbum();
    } else if(!this.isEditing){
      this.createAlbum();
    } else {
      console.error('unable to submit form');
    }

    return false;
  }

}