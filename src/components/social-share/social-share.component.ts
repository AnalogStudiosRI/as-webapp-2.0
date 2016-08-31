import { ActivatedRoute } from '@angular/router';
import { CeiboShare } from 'ng2-social-share';
import { Component } from '@angular/core';

@Component({
  selector: 'as-social-share',
  templateUrl: './social-share.html',
  styleUrls: ['./social-share.less'],
  directives: [ CeiboShare ]
})

export class SocialShareComponent {
  private currentUrl: string;

  constructor(private ActivatedRoute: ActivatedRoute){
    console.log('ActivatedRoute', ActivatedRoute);
    this.currentUrl = 'http://www.analogstudios.net';
  }

  public getCurrentPageUrl(): string {
    return this.currentUrl;
  }
}