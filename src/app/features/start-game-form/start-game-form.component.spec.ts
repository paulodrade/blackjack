import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { StartGameFormComponent } from './start-game-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StartGameFormComponent Integration', () => {
  let component: StartGameFormComponent;
  let fixture: ComponentFixture<StartGameFormComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<StartGameFormComponent>>;
  
  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, StartGameFormComponent, BrowserAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: mockDialogRef }]
    }).compileComponents();
    
    fixture = TestBed.createComponent(StartGameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should close the dialog with form value when the submit button is clicked and form is valid', () => {
    component.playerName.setValue('John Doe'); // Set the value using FormControl
    fixture.detectChanges();
    
    const formElement = fixture.debugElement.query(By.css('form')); // Query the form element
    formElement.triggerEventHandler('submit', null); // Trigger the form submit event
    
    expect(mockDialogRef.close).toHaveBeenCalledWith({ playerName: 'John Doe' }); // Verify the dialog closes with the correct value
  });
  
  it('should not close the dialog when the submit button is clicked and form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('bj-button'));
    
    component.playerName.setValue('');
    fixture.detectChanges();
    
    submitButton.triggerEventHandler('click', null);
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });
  
  it('should display an error message when playerName is empty and input is touched', () => {
    const playerNameInput = fixture.debugElement.query(By.css('input'));
    
    playerNameInput.nativeElement.value = '';
    playerNameInput.nativeElement.dispatchEvent(new Event('input'));
    playerNameInput.nativeElement.dispatchEvent(new Event('blur'));
    
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('mat-error'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent).toContain('Please, inform your name!');
  });
});
