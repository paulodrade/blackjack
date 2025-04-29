import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconComponent } from './icon.component';
import {
  Component,
  ViewChild
} from '@angular/core';

describe('IconComponent Integration', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should render the icon component', () => {
    const matIconElement = fixture.debugElement.query(By.css('mat-icon'));
    expect(matIconElement).toBeTruthy();
  });
  
  it('should apply the correct class when symbol is true', () => {
    component.symbol = true;
    fixture.detectChanges();
    
    const matIconElement = fixture.debugElement.query(By.css('mat-icon'));
    expect(matIconElement.nativeElement.classList).toContain('material-symbols-outlined');
  });
  
  it('should apply the correct class when symbol is false', () => {
    component.symbol = false;
    fixture.detectChanges();
    
    const matIconElement = fixture.debugElement.query(By.css('mat-icon'));
    expect(matIconElement.nativeElement.classList).toContain('material-icons-outlined');
  });
  
});
