import {Component, EventEmitter, Output} from '@angular/core';
import {ScoreService} from "../score.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

interface ScoreEntry {
  name: string;
  score: number;
}

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.css'
})




export class ScoreboardComponent {
  score: number = 0;
  stats: any;
  leaderboard: any[] = [];
  public scoreSubmitted: boolean = false;

  submitScoreForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });


  constructor(private scoreService: ScoreService,
              private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.scoreService.getScore().subscribe(score => {
      this.score = score;
    });

    this.scoreService.stats$.subscribe(stats => {
      this.stats = stats;
    });

    this.scoreService.getScores().subscribe(scores => {
      this.leaderboard = (Object.values(scores) as ScoreEntry[])
        .sort((a: ScoreEntry, b: ScoreEntry) => b.score - a.score)
        .slice(0, 10);
    });
  }

  @Output() playClicked: EventEmitter<void> = new EventEmitter<void>();
  onClickPlay() {
    this.scoreSubmitted = false;
    this.playClicked.emit();
  }

  onSubmit() {
    this.scoreSubmitted = true;
    console.log(this.submitScoreForm.value);
    this.httpClient
      .post('https://aim-game-834f0-default-rtdb.europe-west1.firebasedatabase.app/scores.json',
        {
          name: this.submitScoreForm.value.name,
          score: this.score
        })
      .subscribe(response => {
        console.log(response);

      });
  }

}
