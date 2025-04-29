import { TestBed } from '@angular/core/testing';
import { DeckService } from './deck.service';
import { MainDeckModel } from '@bj-models/main-deck.model';
import { PlayerDeckModel } from '@bj-models/player-deck.model';

describe('DeckService', () => {
  let service: DeckService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  describe('createMainDeck', () => {
    it('should create a main deck with 52 cards', () => {
      const mainDeck = service.createMainDeck();
      expect(mainDeck.cards.length).toBe(52);
    });
    
    it('should assign correct values to cards', () => {
      const mainDeck = service.createMainDeck();
      const aceOfSpades = mainDeck.cards.find(card => card.suit === 'S' && card.face === 'A');
      expect(aceOfSpades?.value).toEqual([1, 11]);
    });
  });
  
  describe('createPlayerDeck', () => {
    it('should create a player deck and store it in playersDecks', () => {
      const playerDeck = service.createPlayerDeck('Player1');
      expect(playerDeck).toBeInstanceOf(PlayerDeckModel);
      expect(service.playersDecks['Player1']).toBe(playerDeck);
    });
  });
  
  describe('drawCard', () => {
    it('should draw a card from the main deck and add it to the player\'s deck', () => {
      const mainDeck = service.createMainDeck();
      const playerDeck = service.createPlayerDeck('Player1');
      
      const initialMainDeckSize = mainDeck.cards.length;
      service.drawCard(playerDeck);
      
      expect(playerDeck.cards.length).toBe(1);
      expect(mainDeck.cards.length).toBe(initialMainDeckSize - 1);
    });
    
    it('should not draw a card if player\'s total points are 21 or more', () => {
      const playerDeck = service.createPlayerDeck('Player1');
      playerDeck.totalPoints = 21;
      
      service.drawCard(playerDeck);
      
      expect(playerDeck.cards.length).toBe(0);
    });
    
  });
});
