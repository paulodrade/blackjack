import { Subject } from 'rxjs';
import { CardModel } from './card.model';
import {
  DeckInterface,
  DeckModel
} from './deck.model';

/**
 * Interface representing the structure of a player's deck.
 */
export interface PlayerDeckInterface extends DeckInterface {
  playerName?: string; // Optional name of the player.
  totalPoints?: number; // Optional total points of the player's deck.
}

/**
 * Class representing a player's deck of cards.
 * Extends the base `DeckModel` class and implements `PlayerDeckInterface`.
 */
export class PlayerDeckModel extends DeckModel implements PlayerDeckInterface {
  
  playerName?: string; // Name of the player.
  totalPoints = 0; // Total points of the player's deck, initialized to 0.
  
  // Subject to emit events when a card is drawn.
  private _onDrawCard = new Subject();
  
  /**
   * Constructor for the `PlayerDeckModel` class.
   * Initializes the player's deck with the provided configuration.
   * @param deck - The player's deck interface containing initial configuration.
   */
  constructor(deck: PlayerDeckInterface) {
    // Call the parent class constructor.
    super(deck);
    
    // Assign the player's name if provided.
    if (deck.playerName) {
      this.playerName = deck.playerName;
    }
  }
  
  /**
   * Returns an observable that emits events when a card is drawn.
   * @returns An observable for card draw events.
   */
  onDrawCard() {
    return this._onDrawCard.asObservable();
  }
  
  /**
   * Adds a card to the player's deck and updates the total points.
   * Emits an event when a card is added.
   * @param card - The card to be added to the deck.
   */
  addCard(card: CardModel) {
    
    // Check if the card model as provided and if it has a value
    if (card && card.value) {
      
      // Add the card to the deck.
      this.cards.push(card);
      
      // Check if the card is an Ace.
      if (card.face === 'A') {
        
        // If adding 11 points would bust the player, add 1 point instead.
        if ((this.totalPoints + card.value[1]) > 21) {
          this.totalPoints += card.value[0];
        }
        else {
          // Otherwise, add 11 points.
          this.totalPoints += card.value[1];
        }
      }
      else {
        // Add the card's normal value.
        this.totalPoints += card.value[0];
      }
    }
    
    // Emit an event indicating a card was drawn.
    this._onDrawCard.next(true);
  }
  
  /**
   * Flips all cards in the player's deck to face up.
   */
  reviewDeck() {
    // Flip each card in the deck.
    this.cards.forEach((card: CardModel) => {
      card.flipCard();
    });
  }
  
  /**
   * Resets the player's deck by clearing all cards and resetting points.
   */
  resetDeck() {
    // Clear the deck.
    this.cards = [];
    
    // Reset the total points to 0.
    this.totalPoints = 0;
  }
}
