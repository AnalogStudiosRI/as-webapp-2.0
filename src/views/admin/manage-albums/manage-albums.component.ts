import { CKEditor } from 'ng2-ckeditor';
import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common'
import { AlbumInterface, AlbumsService } from '../../../services/albums.service';
import { FormBuilder, FormGroup, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { TimepickerComponent } from 'ng2-bootstrap';

@Component({
  selector: 'admin-view-manage-albums',
  templateUrl: './manage-albums.html',
  styleUrls: [ '../admin.less' ],
  providers: [ AlbumsService, FormBuilder ],
  directives: [ CKEditor, CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, TimepickerComponent ]
})

export class AdminViewManageAlbumsComponent extends OnInit {
  private albums: Array<AlbumInterface> = [];
  private pristineAlbum: any = {
    id: null,
    title: '',
    description: '',
    year: null,
    imageUrl: null,
    downloadUrl: null
  };
  public albumForm: FormGroup;

  constructor(private AlbumsService: AlbumsService, private FormBuilder: FormBuilder){
    super();
    this.setAlbumFormGroup(this.pristineAlbum);
  }

  ngOnInit(): void {
    this.AlbumsService.getArtists().subscribe((data: Array<AlbumInterface>) => {
      this.albums = data;
    })
  }

  private setAlbumFormGroup(album: AlbumInterface): void  {
    this.albumForm = this.FormBuilder.group({
      id: album.id || null,
      title: album.title || '',
      description: album.description || '',
      year: album.year || '',
      imageUrl: album.imageUrl || '',
      downloadUrl: album.downloadUrl || ''
    })
  }

  private modelAlbumsRequestBody(): AlbumInterface {
    let controls = this.albumForm.controls;

    return {
      id: controls['id'].value || null,
      title: controls['title'].value || '',
      description: controls['description'].value || '',
      location: controls['location'].value || null,
      label: controls['label'].value || '',
      contactPhone: controls['contactPhone'].value || '',
      contactEmail: controls['contactEmail'].value || '',
      imageUrl: controls['imageUrl'].value || '',
      genre: controls['genre'].value || ''
    }
  }

  private createAlbum(): void {
    //TODO modal / error handling - https://thegreenhouse.atlassian.net/browse/AS-250
    let body = this.modelAlbumsRequestBody();

    this.AlbumsService.createArtist(body).subscribe(() => {
      this.setAlbumFormGroup(this.pristineAlbum);
    }, (error) => {
      console.error('addEvent failure!', error);
    });
  }

  private updateAlbum(): void {
    //TODO modal / error handling - https://thegreenhouse.atlassian.net/browse/AS-250
    let id: number = this.albumForm.controls['id'].value;
    let body: AlbumInterface = this.modelAlbumsRequestBody();

    this.AlbumsService.updateArtist(id, body).subscribe(() => {
      this.setAlbumFormGroup(this.pristineAlbum);
    }, (error) => {
      console.error('Update failure!', error);
    });
  }

  public getArtists(): Array<AlbumInterface> {
    return this.albums;
  }

  public onAlbumSelected(index: number): void {
    let artist = this.albumForm[index];

    this.setAlbumFormGroup(artist);
  }

  public submitForm(): boolean {
    let isUpdatingAlbum: boolean = this.albumForm.controls['id'].value ? true : false;

    if(isUpdatingAlbum) {
      this.updateAlbum();
    } else if(!isUpdatingAlbum){
      this.createAlbum();
    } else {
      console.error('unable to submit form');
    }

    return false;
  }

}