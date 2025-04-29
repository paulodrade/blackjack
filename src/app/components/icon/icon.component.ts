import {
  Component,
  Input
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

/**
 * Component representing an icon.
 */
@Component({
  selector: 'bj-icon',
  standalone: true,
  imports: [
    MatIcon // Import Angular Material Icon module
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  
  /**
   * Determines whether the icon should display a symbol.
   * Default is undefined.
   */
  @Input() symbol?: boolean;
}
