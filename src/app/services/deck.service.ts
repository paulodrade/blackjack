import { Injectable } from '@angular/core';
import { CardModel } from '@bj-models/card.model';
import { MainDeckModel } from '@bj-models/main-deck.model';
import { PlayerDeckModel } from '@bj-models/player-deck.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  
  // Array of card suits
  private suits: string[] = ['S', 'D', 'C', 'H'];
  
  // Array of card faces
  private faces: string[] = ['A', 'K', 'Q', 'J', '0', '9', '8', '7', '6', '5', '4', '3', '2'];
  
  // Main deck instance
  mainDeck = new MainDeckModel({ cards: [] });
  
  // Object to store players decks
  playersDecks: { [key: string]: MainDeckModel | PlayerDeckModel } = {};
  
  /**
   * Creates and initializes the main deck with all cards.
   * @returns A new instance of `MainDeckModel` containing all cards.
   */
  createMainDeck(): MainDeckModel {
    let countCards = 0; // Counter to alternate card back colors
    const cards = []; // Array to hold all card instances
    
    // Loop through each suit
    for (const i in this.suits) {
      
      // Loop through each face
      for (const j in this.faces) {
        
        // Create a new card and add it to the array
        cards.push(new CardModel({
          suit: this.suits[i], // Card suit
          face: this.faces[j], // Card face
          image: `https://deckofcardsapi.com/static/img/${this.faces[j]}${this.suits[i]}.svg`, // Card image URL
          value: ((card): number[] => {
            // Determine card value based on its face
            switch (card) {
              case 'A':
                return [1, 11]; // Ace can be 1 or 11
              case 'K':
              case 'Q':
              case 'J':
              case '0':
                return [10]; // Face cards and 10 have a value of 10
              default:
                return [parseInt(card, 10)]; // Numeric cards have their face value
            }
          })(this.faces[j])
        }));
      }
      
      // Assign the cards to the main deck
      this.mainDeck.cards = cards;
      countCards++; // Increment the counter
    }
    
    // Shuffle the main deck
    this.mainDeck.shuffle();
    
    return this.mainDeck;
  }
  
  /**
   * Creates a new player deck and stores it in the `playersDecks` object.
   * @param player - The name or identifier of the player.
   * @returns A new instance of `PlayerDeckModel` for the player.
   */
  createPlayerDeck(player: string): PlayerDeckModel {
    const deck = new PlayerDeckModel({ cards: [] }); // Create a new player deck
    this.playersDecks[player] = deck; // Store the deck in the playersDecks object
    return deck;
  }
  
  /**
   * Draws a card from the main deck and adds it to the player's deck.
   * @param playerDeck - The player's deck to which the card will be added.
   * @param isFaceUp - Whether the card should be face up (default is true).
   */
  drawCard(playerDeck: PlayerDeckModel, isFaceUp = true) {
    // Ensure the player's total points are less than 21 before drawing
    if (playerDeck.totalPoints < 21) {
      const card = this.mainDeck.drawCard(); // Draw a card from the main deck
      card.isFaceUp = isFaceUp; // Set the card's face-up status
      playerDeck.addCard(card); // Add the card to the player's deck
    }
  }
}
