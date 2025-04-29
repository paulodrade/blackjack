import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardModel } from '@bj-models/card.model';
import { CardComponent } from './card.component';

describe('CardComponent Integration', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should render the card with default width and calculated height', () => {
    const cardElement = fixture.debugElement.query(By.css('div'));
    expect(cardElement).toBeTruthy();
    expect(component.width).toBe(180);
    expect(component.cardHeight()).toBe('252px');
  });
  
  it('should update the card width and recalculate height', () => {
    component.width = 200;
    fixture.detectChanges();
    
    const cardElement = fixture.debugElement.query(By.css('div'));
    expect(component.cardHeight()).toBe('280px');
  });
  
  it('should display card image', () => {
    
    const image = `https://deckofcardsapi.com/static/img/AD.svg`;
    
    component.card = {
      image,
      isFaceUp: true
    } as CardModel;
    
    fixture.detectChanges();
    
    const cardElement = fixture.debugElement.query(By.css('.card'));
    const backgroundImage = getComputedStyle(cardElement.nativeElement).backgroundImage;
    expect(backgroundImage).toBe(`url("${image}")`);
    
  });
});
