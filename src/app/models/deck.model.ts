import { CardModel } from './card.model';

/**
 * Interface representing the structure of a deck.
 */
export interface DeckInterface {
  cards?: CardModel[]; // Optional array of cards in the deck.
}

/**
 * Class representing a deck of cards.
 * Implements the `DeckInterface`.
 */
export class DeckModel implements DeckInterface {
  
  cards: CardModel[] = []; // Array to store the cards in the deck.
  
  /**
   * Constructor for the `DeckModel` class.
   * Initializes the deck with the provided cards, if any.
   * @param deck - The deck interface containing an optional array of cards.
   */
  constructor(deck: DeckInterface) {
    if (Array.isArray(deck.cards)) {
      this.cards = deck.cards; // Assign the provided cards to the deck.
    }
  }
}
