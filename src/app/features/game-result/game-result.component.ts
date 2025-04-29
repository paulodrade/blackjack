import {
  Component,
  Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { ButtonComponent } from '@bj-components/button/button.component';

// Interface defining the structure of the game result data.
interface GameResultInterface {
  hasPush: boolean,
  hasWon: boolean,
  lostConsecutively: boolean,
  wonConsecutively: boolean,
  playerName: string
}

@Component({
  selector: 'bj-game-result',
  standalone: true,
  imports: [
    ButtonComponent // Imports the ButtonComponent for use in the template.
  ],
  templateUrl: './game-result.component.html',
  styleUrl: './game-result.component.scss'
})
export class GameResultComponent {
  
  // Arrays of face icons for different game outcomes.
  private bustedFaces = [
    'alarmed-face-icon',
    'chagrin-face-icon',
    'surprise-face-icon',
    'angry-face-icon',
    'cry-face-icon'
  ];
  
  private winnerFaces = [
    'cute-face-icon',
    'glasses-face-icon',
    'excited-face-icon',
    'laughter-face-icon',
    'smile-face-icon'
  ];
  
  private pushFaces = [
    'poo-face-icon',
    'laugh-face-icon',
    'shock-face-icon'
  ];
  
  // Arrays of phrases for different game outcomes.
  private bustedPhrases = [
    'Soooorryy {{playerName}}, you busted {{again}}!!!',
    'OMG {{playerName}}, you busted {{again}}!!!',
    'Ouch. you are an loser {{playerName}}!!! heheh',
    'heheheh, you busted {{again}} {{playerName}}!!!',
    'You busted {{again}} {{playerName}}!!!'
  ];
  
  private winnerPhrases = [
    'Great, you won {{again}} {{playerName}}!!!',
    'OMG, you are good {{playerName}}!!!',
    'You are a winner {{playerName}}!!! heheh',
    'heheheh, you won {{again}}!!!',
    'You won {{again}} {{playerName}}!!!'
  ];
  
  private pushPhrases = [
    'You and the dealer have tied.'
  ];
  
  currentFace?: string; // Stores the current face icon to display.
  currentPhrase?: string; // Stores the current phrase to display.
  
  constructor(
    public dialogRef: MatDialogRef<GameResultComponent>, // Reference to the dialog for closing it.
    @Inject(MAT_DIALOG_DATA) public data: GameResultInterface, // Injected data containing game result details.
  ) {
    
    // Determine the face and phrase to display based on the game result.
    if (data.hasWon) {
      this.currentFace = this.getRandomIcon(this.winnerFaces);
      this.currentPhrase = this.getRandomPhrases(this.winnerPhrases, data.wonConsecutively, data.playerName);
    }
    else if (data.hasPush) {
      this.currentFace = this.getRandomIcon(this.pushFaces);
      this.currentPhrase = this.getRandomPhrases(this.pushPhrases);
    }
    else {
      this.currentFace = this.getRandomIcon(this.bustedFaces);
      this.currentPhrase = this.getRandomPhrases(this.bustedPhrases, data.lostConsecutively, data.playerName);
    }
  }
  
  /**
   * Selects a random face icon from the provided array.
   * @param faces - Array of face icon strings.
   * @returns A randomly selected face icon.
   */
  private getRandomIcon(faces: string[]): string {
    return faces[Math.floor(Math.random() * faces.length)];
  }
  
  /**
   * Selects a random phrase from the provided array and replaces placeholders with actual values.
   * @param phrases - Array of phrase strings.
   * @param again - Boolean indicating if the phrase should include "again".
   * @param playerName - Optional player name to replace in the phrase.
   * @returns A formatted phrase with placeholders replaced.
   */
  private getRandomPhrases(phrases: string[], again = false, playerName?: string): string {
    let phrase = phrases[Math.floor(Math.random() * phrases.length)];
    
    if (again) {
      phrase = phrase.replace('{{again}}', 'again');
    }
    else {
      phrase = phrase.replace(/\s?\{\{again\}\}\s?/, '');
    }
    
    if (playerName) {
      phrase = phrase.replace('{{playerName}}', `${playerName.split(' ')[0]}`);
    }
    
    return phrase;
  }
  
  /**
   * Closes the dialog and starts a new game.
   */
  startNewGame(): void {
    this.dialogRef.close();
  }
}
