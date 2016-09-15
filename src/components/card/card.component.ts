import { Component, Input } from '@angular/core';
import { CardOptionsInterface } from '../../services/card.service';

@Component({
  selector: 'as-card',
  templateUrl: './card.html',
  styleUrls: [ './card.less' ]
})

export class CardComponent {
  @Input() private cardOptions: CardOptionsInterface;

  constructor(){}

  public getCardOptions(): CardOptionsInterface {
    //console.log('getCardOptions', this.cardOptions);
    return this.cardOptions;
  }
}