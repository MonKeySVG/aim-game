import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  squares: any[] = [];

  ngOnInit() {
    this.newGame();
  }
  newGame() {
    this.squares = Array(9).fill(false);
    console.log('new game');
  }
}
