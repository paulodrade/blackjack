import { CardModel } from './card.model';
import {
  DeckInterface,
  DeckModel
} from './deck.model';

/**
 * Interface for the main deck, extending the base deck interface.
 */
export interface MainDeckInterface extends DeckInterface {
}

/**
 * Class representing the main deck of cards.
 * Extends the base `DeckModel` class.
 */
export class MainDeckModel extends DeckModel {
  
  /**
   * Constructor for the `MainDeckModel` class.
   * @param deck - The deck interface containing the initial deck configuration.
   */
  constructor(deck: MainDeckInterface) {
    super(deck); // Call the parent class constructor
  }
  
  /**
   * Shuffles the cards in the deck using the Fisher-Yates algorithm.
   */
  shuffle() {
    
    // Loop through the deck from the last card to the first
    for (let i = this.cards.length - 1; i > 0; i--) {
      
      // Generate a random index between 0 and the current index
      const j = Math.floor(Math.random() * (i + 1));
      
      // Swap the current card with the card at the random index
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      
    }
  }
  
  /**
   * Draws a card from the top of the deck.
   * @returns The card model representing the drawn card.
   */
  drawCard(): CardModel {
    // Remove and return the last card in the deck (top of the pile)
    return this.cards.splice(-1, 1)[0];
  }
}
