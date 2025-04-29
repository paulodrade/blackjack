import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { GameResultComponent } from './game-result.component';

describe('GameResultComponent Integration', () => {
  let component: GameResultComponent;
  let fixture: ComponentFixture<GameResultComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<GameResultComponent>>;
  
  const mockData = {
    hasPush: false,
    hasWon: true,
    lostConsecutively: false,
    wonConsecutively: true,
    playerName: 'John Doe'
  };
  
  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    
    await TestBed.configureTestingModule({
      imports: [GameResultComponent], // Standalone component
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(GameResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should close the dialog when startNewGame is called', () => {
    component.startNewGame();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
  
  it('should display the correct face image', () => {
    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement).toBeTruthy();
    expect(imgElement.nativeElement.src).toContain(component.currentFace);
  });
  
  it('should display the correct phrase', () => {
    const phraseElement = fixture.debugElement.query(By.css('.title'));
    expect(phraseElement).toBeTruthy();
    expect(phraseElement.nativeElement.textContent).toContain(component.currentPhrase);
  });
  
  it('should close the dialog when the button is clicked', () => {
    const buttonElement = fixture.debugElement.query(By.css('bj-button'));
    expect(buttonElement).toBeTruthy();
    
    buttonElement.triggerEventHandler('click', null);
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
  
  it('should replace placeholders in phrases correctly', () => {
    const phrase = component['getRandomPhrases'](['Hello {{playerName}}, {{again}}!'], true, 'John');
    expect(phrase).toBe('Hello John, again!');
  });
  
  it('should display phrases no correctly', () => {
    const phrase = component['getRandomPhrases'](['Hello {{playerName}} {{again}}!'], false, 'John');
    expect(phrase).toBe('Hello John!');
  });
  
  it('should select a random face icon', () => {
    const face = component['getRandomIcon'](['icon1', 'icon2', 'icon3']);
    expect(['icon1', 'icon2', 'icon3']).toContain(face);
  });
});
