import {
  Component,
  Input
} from '@angular/core';
import {
  MatFabButton
} from '@angular/material/button';

/**
 * Component representing a customizable button.
 */
@Component({
  selector: 'bj-button',
  standalone: true,
  imports: [
    MatFabButton // Import Angular Material Floating Action Button module
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  
  // The type of the button (e.g., 'button', 'submit', 'reset').
  // Default is 'button'.
  @Input() type = 'button';
  
  // The color of the button (e.g., 'primary', 'secondary').
  // Default is 'secondary'.
  @Input() color = 'secondary';
  
  // Whether the button is disabled.
  // Default is false.
  @Input() disabled = false;
  
}
