import {
  Component,
  Input
} from '@angular/core';
import { CardModel } from '@bj-models/card.model';

/**
 * Component representing a card in the deck.
 */
@Component({
  selector: 'bj-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  
  /**
   * The card data to be displayed.
   * This is an instance of the `CardModel`.
   */
  @Input() card?: CardModel;
  
  /**
   * The width of the card in pixels.
   * Default value is 180.
   */
  @Input() width = 180;
  
  /**
   * Calculates the height of the card based on its width.
   * The aspect ratio is 1.4.
   * @returns The height of the card as a string with 'px' units.
   */
  cardHeight() {
    return `${Math.ceil(this.width * 1.4)}px`;
  }
}
