import { Component } from '@angular/core';
import {CountdownService} from "./countdown.service";
import {Subscription} from "rxjs";


enum GameState {
  Menu = 'menu',
  Game = 'game',
  Score = 'score'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aim-game';
  constructor(private countdownService: CountdownService) {
    this.countdownSubscription = this.countdownService.countdown.subscribe(countdownValue => {
      if (countdownValue === 0) {
        this.gameState = GameState.Score;
      }
    });
  }

  private countdownSubscription: Subscription;




  gameState: GameState = GameState.Menu;

  onPlayClicked() {
    this.gameState = GameState.Game;
  }

  ngOnDestroy(): void {
    this.countdownSubscription.unsubscribe(); // Nettoyer la souscription lors de la destruction du composant
  }

  protected readonly GameState = GameState;
}
