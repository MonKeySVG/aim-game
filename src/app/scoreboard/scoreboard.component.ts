import {Component, EventEmitter, Output} from '@angular/core';
import {ScoreService} from "../score.service";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.css'
})
export class ScoreboardComponent {
  score: number = 0;
  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.scoreService.getScore().subscribe(score => {
      this.score = score;
    });
  }

  @Output() playClicked: EventEmitter<void> = new EventEmitter<void>();
  onClickPlay() {
    this.playClicked.emit();
  }
}
