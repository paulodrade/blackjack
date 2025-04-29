import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { CardModel } from '@bj-models/card.model';
import { PlayerDeckModel } from '@bj-models/player-deck.model';
import { DeckService } from '@bj-services/deck.service';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent Integration with Template and Real DeckService', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  
  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: MatDialog, useValue: dialog },
        DeckService, // Use the real DeckService
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.daleyTimeout = 1; // Set daleyTimeout to 1 for testing
    
    // Mock dialog behavior
    dialog.open.and.returnValue({
      afterClosed: () => of({ playerName: 'Test Player' }),
    } as any);
    
  });
  
  describe('should initialize the game', async () => {
    
    it('the game player should be Test Player', () => {
      fixture.detectChanges();
      expect(component.playerDeck.playerName).toBe('Test Player');
    });
    
    it('should game had started', fakeAsync(() => {
      
      // Call the function with resetDecks = false
      component.startNewGame(false);
      tick(10); // Wait 10ms just in case
      
      expect(component.gameHasStarted).toBe(true);
      expect(component.gameHasFinished).toBe(false);
      
    }));
    
    it('should main deck be 4 cards less due to players cards distribution', fakeAsync(() => {
      
      // Call the function with resetDecks = false
      component.startNewGame(false);
      tick(10); // Wait 10ms just in case
      
      expect(component.mainDeck.cards.length).toBe(48); // Main deck should have 48 cards (since we have drew 4 cards, 2 for player and 2 for dealer)
      
    }));
    
    it('should player deck have 2 cards and both faced up', fakeAsync(() => {
      
      // Call the function with resetDecks = false
      component.startNewGame(false);
      tick(10); // Wait 10ms just in case
      
      expect(component.playerDeck.cards.length).toBe(2); // Player deck should have 2 cards
      expect(component.playerDeck.cards.filter(card => card.isFaceUp).length).toBe(2); // Player deck should have 2 both cards faced up
      
    }));
    
    it('should dealer deck have 2 cards and 1 face up and the other faced down', fakeAsync(() => {
      
      // Call the function with resetDecks = false
      component.startNewGame(false);
      tick(10); // Wait 10ms just in case
      
      expect(component.dealerDeck.cards.length).toBe(2); // Dealer deck should have 2 cards
      expect(component.dealerDeck.cards.filter(card => !card.isFaceUp).length).toBe(1); // Player deck should have 2 both cards faced up
      
    }));
    
  });
  
  describe('should finish the game', () => {
    it('should player have busted', fakeAsync(() => {
      
      component.playerDeck = new PlayerDeckModel({cards: []});
      
      // drawing a number of cards to force the player to bust
      component.playerDeck.totalPoints = 20;
      component.drawCard();
      
      expect(component.playerDeck.totalPoints).toBeGreaterThan(21);
      
    }));
    
    it('should player have Blackjack', fakeAsync(() => {
      
      component.playerDeck = new PlayerDeckModel({cards: []});
      
      const fistCard = component.mainDeck.cards.find(card => card.suit === 'S' && card.face === 'A') as CardModel;
      const secondCard = component.mainDeck.cards.find(card => card.suit === 'C' && card.face === '0') as CardModel;
      
      component.playerDeck.addCard(fistCard);
      component.playerDeck.addCard(secondCard);
      
      expect(component.playerDeck.totalPoints).toEqual(21);
      
    }));
    
    it('should player have won over dealer by stand', () => {
      
      component.dealerDeck = new PlayerDeckModel({cards: []});
      component.playerDeck = new PlayerDeckModel({cards: []});
      
      const dealerFistCard = component.mainDeck.cards.find(card => card.suit === 'S' && card.face === '7') as CardModel;
      const dealerSecondCard = component.mainDeck.cards.find(card => card.suit === 'H' && card.face === '0') as CardModel;
      
      const playerFistCard = component.mainDeck.cards.find(card => card.suit === 'S' && card.face === '0') as CardModel;
      const playerSecondCard = component.mainDeck.cards.find(card => card.suit === 'C' && card.face === '8') as CardModel;
      
      component.dealerDeck.addCard(dealerFistCard);
      component.dealerDeck.addCard(dealerSecondCard);
      
      component.playerDeck.addCard(playerFistCard);
      component.playerDeck.addCard(playerSecondCard);
      
      // Mock dialog.open to avoid executing afterClosed, and therefore start the game without pressing "Start New Game",
      // causing the `gameHasFinished` to get back being false
      dialog.open.and.returnValue({
        afterClosed: jasmine.createSpy('afterClosed').and.returnValue(of()), // Return an empty Observable
      } as any);
      
      component.stand();
      fixture.detectChanges();
      
      expect(component.playerDeck.totalPoints).toBeGreaterThan(component.dealerDeck.totalPoints);
      expect(component.gameHasFinished).toBe(true);
      
    });
    
  });
  
});
