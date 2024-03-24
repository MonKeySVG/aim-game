import {Component} from '@angular/core';
import {CountdownService} from "../countdown.service";
import {ScoreService} from "../score.service";

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

  pointsEarned: {points: number, top: number, left: number}[] = [];

  countdownValue: number = this.countdownService.countdownValue;

  constructor(private countdownService: CountdownService,
              private scoreService: ScoreService
  ) { }

  ngOnInit() {
    this.newGame();

    this.scoreService.getScore().subscribe(score => {
      this.score = score;
    });

    this.countdownService.startCountdown();
    this.countdownService.countdown.subscribe(value => {
      this.countdownValue = value;
    });
  }
  newGame() {
    this.scoreService.updateScore(0);
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

  toggleSquare(index: number, event: MouseEvent): void {
    if (this.squares[index])  {



      this.squares[index] = !this.squares[index];


      const currentTime = Date.now();
      if (currentTime - this.lastActiveClickTime <= this.multiplicatorDelay) {
        this.scoreService.incrementScore(2); // Gagner 2 points si le clic est rapide
        const points = currentTime - this.lastActiveClickTime <= this.multiplicatorDelay ? 2 : 1;
        this.pointsEarned.push({points, top: event.clientY, left: event.clientX});
      } else {
        this.scoreService.incrementScore(1); // Gagner 1 point normalement
        const points = currentTime - this.lastActiveClickTime <= this.multiplicatorDelay ? 2 : 1;
        this.pointsEarned.push({points, top: event.clientY, left: event.clientX});
      }
      this.lastActiveClickTime = currentTime;



      let randomIndex: number;
      do {
        randomIndex = Math.floor(Math.random() * this.squares.length);
      } while (randomIndex === index || this.squares[randomIndex]);

      // Active le carré aléatoire
      this.squares[randomIndex] = true;

    } else {
      this.errors[index] = true; // Définit isError à true pour le carré correspondant
      this.scoreService.incrementScore(-10);
      setTimeout(() => {
        this.errors[index] = false; // Réinitialise isError à false après 0.5 seconde

      }, 200);
    }


  }
}
