import { CKEditor } from 'ng2-ckeditor';
import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common'
import { ArtistInterface, ArtistsService } from '../../../services/artists.service';
import { FormBuilder, FormGroup, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

@Component({
  selector: 'admin-view-manage-artists',
  templateUrl: './manage-artists.html',
  styleUrls: [ '../admin.less' ],
  providers: [ ArtistsService, FormBuilder ],
  directives: [ CKEditor, CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES ]
})

export class AdminViewManageArtistsComponent extends OnInit {
  private artists: Array<ArtistInterface> = [];
  private pristineArtist: ArtistInterface = {
    id: null,
    name: '',
    bio: '',
    location: null,
    label: null,
    imageUrl: null,
    isActive: null,
    contactPhone: null,
    contactEmail: null
  };
  public artistForm: FormGroup;

  constructor(private ArtistsService: ArtistsService, private FormBuilder: FormBuilder){
    super();
    this.setArtistFormGroup(this.pristineArtist);
  }

  ngOnInit(): void {
    this.ArtistsService.getArtists().subscribe((data: Array<ArtistInterface>) => {
      this.artists = data;
    })
  }

  private setArtistFormGroup(artist: ArtistInterface): void  {
    this.artistForm = this.FormBuilder.group({
      id: artist.id || null,
      name: artist.name || '',
      bio: artist.bio || '',
      location: artist.location || '',
      label: artist.label || '',
      contactPhone: artist.contactPhone || '',
      contactEmail: artist.contactEmail || '',
      imageUrl: artist.imageUrl || '',
      genre: artist.genre || ''
    })
  }

  private modelArtistsRequestBody(): ArtistInterface {
    let controls = this.artistForm.controls;

    return {
      id: controls['id'].value || null,
      name: controls['name'].value || '',
      bio: controls['bio'].value || '',
      location: controls['location'].value || null,
      label: controls['label'].value || '',
      contactPhone: controls['contactPhone'].value || '',
      contactEmail: controls['contactEmail'].value || '',
      imageUrl: controls['imageUrl'].value || '',
      genre: controls['genre'].value || ''
    }
  }

  private createArtist(): void {
    //TODO modal / error handling - https://thegreenhouse.atlassian.net/browse/AS-250
    let body = this.modelArtistsRequestBody();

    this.ArtistsService.createArtist(body).subscribe(() => {
      this.setArtistFormGroup(this.pristineArtist);
    }, (error) => {
      console.error('addEvent failure!', error);
    });
  }

  private updateArtist(): void {
    //TODO modal / error handling - https://thegreenhouse.atlassian.net/browse/AS-250
    let id: number = this.artistForm.controls['id'].value;
    let body: ArtistInterface = this.modelArtistsRequestBody();

    this.ArtistsService.updateArtist(id, body).subscribe(() => {
      this.setArtistFormGroup(this.pristineArtist);
    }, (error) => {
      console.error('Update failure!', error);
    });
  }

  public getArtists(): Array<ArtistInterface> {
    return this.artists;
  }

  public onArtistSelected(index: number): void {
    let artist = this.artists[index];

    this.setArtistFormGroup(artist);
  }

  public submitForm(): boolean {
    let isUpdatingArtist: boolean = this.artistForm.controls['id'].value ? true : false;

    console.log('onArtistSelected', this.artistForm.controls);

    if(isUpdatingArtist) {
      this.updateArtist();
    } else if(!isUpdatingArtist){
      this.createArtist();
    } else {
      console.error('unable to submit form');
    }

    return false;
  }

}