import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatLabel
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ButtonComponent } from '@bj-components/button/button.component';

@Component({
  selector: 'bj-start-game-form',
  standalone: true,
  imports: [
    MatFormField, // Material Design form field module.
    MatInput, // Material Design input module.
    MatLabel, // Material Design label module.
    MatError, // Material Design error module.
    ReactiveFormsModule, // Module for reactive forms.
    ButtonComponent // Custom button component.
  ],
  templateUrl: './start-game-form.component.html',
  styleUrl: './start-game-form.component.scss'
})
export class StartGameFormComponent {
  
  @ViewChild('playerNameInput') playerNameInput?: ElementRef;
  
  // Form control for the player's name.
  playerName = new FormControl('');
  
  // Form group containing the userName control.
  form = new FormGroup({
    playerName: this.playerName
  });
  
  constructor(
    public dialogRef: MatDialogRef<StartGameFormComponent> // Reference to the dialog for closing it.
  ) {
  }
  
  /**
   * Submits the form and closes the dialog if the form is valid.
   * Passes the form value to the dialog's close method.
   */
  startNewGame(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
