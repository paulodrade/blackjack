import {
  Component,
  inject,
  Input,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ButtonComponent } from '@bj-components/button/button.component';
import { IconComponent } from '@bj-components/icon/icon.component';
import { DeckCardsComponent } from '@bj-features/deck-cards/deck-cards.component';
import { GameResultComponent } from '@bj-features/game-result/game-result.component';
import { StartGameFormComponent } from '@bj-features/start-game-form/start-game-form.component';
import { delay } from '@bj-helpers/delay.helper';
import { CardModel } from '@bj-models/card.model';
import { PlayerDeckModel } from '@bj-models/player-deck.model';
import { DeckService } from '@bj-services/deck.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DeckCardsComponent,
    IconComponent,
    ButtonComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  @Input() cards?: CardModel[];
  @Input() displayAsFan?: boolean;
  
  // injectables
  deckService = inject(DeckService);
  dialog = inject(MatDialog);
  
  // scope variables
  gameHasStarted = false;
  gameHasFinished = false;
  hasLostLastTime = false;
  hasWonLastTime = false;
  isMobile = window.innerWidth <= 568;
  daleyTimeout = 500;
  
  // models
  mainDeck = this.deckService.createMainDeck();
  dealerDeck = this.deckService.createPlayerDeck('dealer');
  playerDeck = this.deckService.createPlayerDeck('player');
  
  /**
   * Lifecycle hook that initializes the component.
   * Opens the start game modal and subscribes to deck events.
   */
  ngOnInit() {
    
    // Open the start game modal dialog
    const startGameModal = this.dialog.open(StartGameFormComponent, {
      disableClose: true
    });
    
    // After the modal is closed, retrieve the player's name and start a new game
    startGameModal.afterClosed().subscribe(result => {
      this.playerDeck.playerName = result.playerName; // Set the player's name
      this.startNewGame(); // Start a new game
    });
    
    // Subscribe to the player's deck draw event to process game results
    this.playerDeck.onDrawCard().subscribe(() => {
      this.processGameResults(); // Check the game state after each card draw
    });
    
  }
  
  /**
   * Starts a new game, optionally resetting the decks.
   * @param resetDecks - Whether to reset the decks before starting a new game.
   */
  async startNewGame(resetDecks = false) {
    
    // Reset game state
    this.gameHasStarted = false;
    this.gameHasFinished = false;
    
    if (resetDecks) {
      // Reinitialize the main, dealer, and player decks
      this.mainDeck = this.deckService.createMainDeck();
      this.dealerDeck.resetDeck();
      this.playerDeck.resetDeck();
    }
    
    // Draw initial cards for the player and dealer
    this.deckService.drawCard(this.playerDeck); // Player's first card
    
    await delay(this.daleyTimeout); // Add delay for better user experience
    this.deckService.drawCard(this.dealerDeck); // Dealer's first card
    
    await delay(this.daleyTimeout);
    this.deckService.drawCard(this.playerDeck); // Player's second card
    
    await delay(this.daleyTimeout);
    this.deckService.drawCard(this.dealerDeck, false); // Dealer's second card (hidden)
    
    // Mark the game as started
    this.gameHasStarted = true;
    
  }
  
  /**
   * Processes the game results based on the current state or when the player stands.
   * @param stand - Whether the player has chosen to stand.
   */
  processGameResults(stand = false) {
    
    let hasFinished = false;
    let hasWon = false;
    let hasPush = false;
    let lostConsecutively = false;
    let wonConsecutively = false;
    
    // Check if the player has lost
    if (
      this.playerDeck.totalPoints > 21 || // Player busts
      (stand && this.playerDeck.totalPoints < this.dealerDeck.totalPoints) // Dealer has more points
    ) {
      hasFinished = true;
      lostConsecutively = this.hasLostLastTime; // Track consecutive losses
    }
    
    // Check if the player has won
    else if (
      this.playerDeck.totalPoints === 21 || // Player hits 21
      (stand && this.playerDeck.totalPoints > this.dealerDeck.totalPoints) // Player has more points
    ) {
      hasFinished = true;
      hasWon = true;
      wonConsecutively = this.hasWonLastTime; // Track consecutive wins
    }
    
    // Check if the game is a tie
    else if (this.playerDeck.totalPoints === this.dealerDeck.totalPoints) {
      hasFinished = true;
      hasPush = true; // Game is a tie
    }
    
    if (hasFinished) {
      
      // Mark the game as finished
      this.gameHasFinished = true;
      
      // Review the dealer's deck to reveal hidden cards
      this.dealerDeck.reviewDeck();
      
      // Open the game result modal with the outcome details
      const gameResultModal = this.dialog.open(GameResultComponent, {
        disableClose: true,
        data: {
          hasPush,
          hasWon,
          lostConsecutively,
          wonConsecutively,
          playerName: this.playerDeck.playerName
        }
      });
      
      // Start a new game after the result modal is closed
      gameResultModal.afterClosed().subscribe(() => {
        this.startNewGame(true); // Reset decks and start a new game
      });
      
      // Update win/loss streaks
      if (hasWon) {
        this.hasWonLastTime = true;
        this.hasLostLastTime = false;
      }
      else {
        this.hasLostLastTime = true;
        this.hasWonLastTime = false;
      }
    }
  }
  
  /**
   * Draws a card for the player.
   */
  drawCard() {
    if (this.playerDeck) {
      this.deckService.drawCard(this.playerDeck); // Add a card to the player's deck
    }
  }
  
  /**
   * Ends the player's turn and processes the game results.
   */
  stand() {
    this.processGameResults(true); // Process results as the player stands
  }
}
