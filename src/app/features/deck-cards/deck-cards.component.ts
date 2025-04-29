import {
  Component,
  Input
} from '@angular/core';
import { CardComponent } from '@bj-components/card/card.component';
import { MainDeckModel } from '@bj-models/main-deck.model';
import { PlayerDeckModel } from '@bj-models/player-deck.model';

@Component({
  selector: 'bj-deck-cards',
  standalone: true,
  imports: [
    CardComponent // Import Card component
  ],
  templateUrl: './deck-cards.component.html',
  styleUrl: './deck-cards.component.scss'
})
export class DeckCardsComponent {
  
  // Input property to receive the deck data, which can be either a MainDeckModel or PlayerDeckModel.
  @Input() deck?: MainDeckModel | PlayerDeckModel;
  
  // Determines if the cards should be displayed in a fan layout.
  @Input() spreadLayout?: boolean;
  
  // Specifies the cut position in the deck (in pixels).
  @Input() distanceBetween = 2;
  
  // Input property to toggle the display of the total points of the deck.
  @Input() showTotal = false;
  
  // Input property to set the width of each card in pixels (in pixels).
  @Input() cardWidth = 180;
  
  /**
   * Calculates the rotation transform for a card in a "fan" layout.
   * The rotation is based on the card's index and the total number of cards.
   *
   * @param index - The index of the card in the deck.
   * @param total - The total number of cards in the deck.
   * @returns A string representing the CSS transform for rotation.
   */
  getSpreadTransform(index: number, total: number) {
    const maxAngle = 10; // Maximum angle for the fan layout.
    const center = total / 2 - 0.5; // Center point of the fan.
    const angleStep = maxAngle / total; // Angle step between cards.
    const angle = (index - center) * angleStep; // Calculate the rotation angle.
    
    return `rotate(${angle}deg)`;
  }
  
  /**
   * Retrieves the total points of the deck.
   * If the deck is a MainDeckModel, it returns the totalPoints property.
   * Otherwise, it defaults to 0.
   *
   * @param deck - The deck object, which can be a MainDeckModel or PlayerDeckModel.
   * @returns The total points of the deck.
   */
  getDeckTotal(deck: MainDeckModel | PlayerDeckModel) {
    if ('totalPoints' in deck) {
      return deck.totalPoints;
    }
    
    return 0;
  }
  
}
