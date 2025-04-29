import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from '@bj-components/card/card.component';
import { CardModel } from '@bj-models/card.model';
import { MainDeckModel } from '@bj-models/main-deck.model';
import { DeckCardsComponent } from './deck-cards.component';

describe('DeckCardsComponent Integration', () => {
  let component: DeckCardsComponent;
  let fixture: ComponentFixture<DeckCardsComponent>;
  
  const mainDeck: MainDeckModel = {
    totalPoints: 18,
    shuffle() {},
    drawCard() {
      return { image: 'https://example.com/card.png' } as CardModel;
    },
    cards: [],
  } as MainDeckModel;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckCardsComponent, CardComponent],
    }).compileComponents();
    
    fixture = TestBed.createComponent(DeckCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should render the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should display cards when deck is provided', () => {
    component.deck = mainDeck;
    fixture.detectChanges();
    
    const cardElements = fixture.debugElement.queryAll(By.css('bj-card'));
    expect(cardElements.length).toBe(mainDeck.cards.length);
  });
  
  it('should calculate correct spread transform for cards', () => {
    const totalCards = 5;
    const index = 2;
    const transform = component.getSpreadTransform(index, totalCards);
    
    const expectedTransform = `rotate(${(index - (totalCards / 2 - 0.5)) * (10 / totalCards)}deg)`;
    expect(transform).toBe(expectedTransform);
  });
  
  it('should display total points when showTotal is true', () => {
    component.deck = mainDeck;
    component.showTotal = true;
    fixture.detectChanges();
    
    const totalPointsElement = fixture.debugElement.query(By.css('.deck__total'));
    expect(totalPointsElement).toBeTruthy();
    expect(totalPointsElement.nativeElement.textContent).toContain('18');
  });
  
  it('should apply default card width', () => {
    const cardWidth = component.cardWidth;
    expect(cardWidth).toBe(180);
  });
});
