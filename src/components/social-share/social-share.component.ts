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
  //TODO make domain dynamic, and const - https://thegreenhouse.atlassian.net/browse/AS-246
  private domain: string = 'http://www.analogstudios.net';

  private getSlug(): string {
    //TODO any - https://thegreenhouse.atlassian.net/browse/AS-246
    let url: any = this.ActivatedRoute.snapshot.url;

    return url[0].path + '/' + url[1].path;
  }

  constructor(private ActivatedRoute: ActivatedRoute){
    this.currentUrl = this.domain + '/' + this.getSlug();
  }

  public getCurrentPageUrl(): string {
    return this.currentUrl;
  }
}