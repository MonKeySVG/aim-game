import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  squares: any[] = [];
  errors: any[] = [];
  numOfActiveSquares: number = 4;
  score: number = 0;
  lastActiveClickTime: number = 0;
  multiplicatorDelay: number = 500; // Delai en ms

  ngOnInit() {
    this.newGame();
  }
  newGame() {
    this.score = 0;
    this.squares = Array(9).fill(false);
    this.errors = Array(9).fill(false);


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


      const currentTime = Date.now();
      if (currentTime - this.lastActiveClickTime <= this.multiplicatorDelay) {
        this.score += 2; // Gagner 2 points si le clic est rapide
      } else {
        this.score += 1; // Gagner 1 point normalement
      }
      this.lastActiveClickTime = currentTime;



      let randomIndex: number;
      do {
        randomIndex = Math.floor(Math.random() * this.squares.length);
      } while (randomIndex === index || this.squares[randomIndex]);

      // Active le carré aléatoire
      this.squares[randomIndex] = true;
      console.log(this.score);

    } else {
      this.errors[index] = true; // Définit isError à true pour le carré correspondant
      this.score -= 10
      setTimeout(() => {
        this.errors[index] = false; // Réinitialise isError à false après 0.5 seconde

      }, 200);
    }


  }
}
