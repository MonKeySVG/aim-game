import {Component, ViewChild} from '@angular/core';
import {CountdownService} from "./countdown.service";
import {Subscription} from "rxjs";
import {GameComponent} from "./game/game.component";

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

  @ViewChild('gameComponent') gameComponent!: GameComponent;


  gameState: GameState = GameState.Menu;

  onPlayClicked() {
    this.gameState = GameState.Game;
  }

  ngAfterViewInit() {
    if (this.gameState === GameState.Game) {
      this.gameComponent.newGame();
    }
  }
  ngOnDestroy(): void {
    this.countdownSubscription.unsubscribe();
  }

  protected readonly GameState = GameState;
}
