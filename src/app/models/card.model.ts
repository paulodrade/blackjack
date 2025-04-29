/**
 * Interface representing the structure of a card.
 */
export interface CardInterface {
  suit?: string; // The suit of the card (e.g., Hearts, Diamonds)
  face?: string; // The face value of the card (e.g., A, K, Q, J)
  image?: string; // The URL of the card's image
  back?: 'red' | 'black'; // The color of the card's back
  isFaceUp?: boolean; // Whether the card is face up
  value: number[]; // The numerical value(s) of the card
}

/**
 * Class representing a card in the deck.
 * Implements the `CardInterface`.
 */
export class CardModel implements CardInterface {
  
  suit?: string;
  face?: string;
  image?: string;
  value: number[] = [];
  
  isFaceUp = false; // Default state: the card is face down
  
  /**
   * Constructor for the `CardModel` class.
   * Initializes the card properties based on the provided interface.
   * @param card - The card interface containing the card's properties.
   */
  constructor(card: CardInterface) {
    this.suit = card.suit; // Assign the suit
    this.face = card.face; // Assign the face (note: this seems like a potential bug)
    this.image = card.image; // Assign the image URL
    this.value = card.value; // Assign the card's value(s)
  }
  
  /**
   * Flips the card to make it face up.
   */
  flipCard() {
    this.isFaceUp = true; // Set the card's state to face up
  }
}
