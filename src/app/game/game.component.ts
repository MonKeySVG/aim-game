import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  squares: any[] = [];
  numOfActiveSquares: number = 4;
  score: number = 0;

  ngOnInit() {
    this.newGame();
  }
  newGame() {
    this.score = 0;
    this.squares = Array(9).fill(false);

    const randomIndices: number[] = [];
    while (randomIndices.length < this.numOfActiveSquares) {
      const randomIndex = Math.floor(Math.random() * this.squares.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }

    randomIndices.forEach(index => {
      this.squares[index] = true;
    });
  }

  toggleSquare(index: number): void {
    if (this.squares[index])  {
      this.squares[index] = !this.squares[index];
      this.score++;

      let randomIndex: number;
      do {
        randomIndex = Math.floor(Math.random() * this.squares.length);
      } while (randomIndex === index || this.squares[randomIndex]);

      // Active le carré aléatoire
      this.squares[randomIndex] = true;
      console.log(this.score);

    }


  }
}
