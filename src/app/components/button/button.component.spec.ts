import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent Integration', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should render the button with default properties', () => {
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.nativeElement.type).toBe('button');
    expect(buttonElement.nativeElement.disabled).toBe(false);
    expect(buttonElement.nativeElement.classList).toContain('mat-secondary');
  });
  
  it('should apply custom input properties', () => {
    component.type = 'submit';
    component.color = 'primary';
    component.disabled = true;
    fixture.detectChanges();
    
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.type).toBe('submit');
    expect(buttonElement.nativeElement.disabled).toBe(true);
    expect(buttonElement.nativeElement.classList).toContain('mat-primary');
  });
  
});
