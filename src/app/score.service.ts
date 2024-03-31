import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scoreSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private stats = new BehaviorSubject<any>({});
  stats$ = this.stats.asObservable();

  constructor(private http: HttpClient) { }

  getScore(): Observable<number> {
    return this.scoreSubject.asObservable();
  }

  updateScore(score: number): void {
    this.scoreSubject.next(score);
  }

  incrementScore(points: number): void {
    const currentScore = this.scoreSubject.value;
    const newScore = currentScore + points;
    this.scoreSubject.next(newScore);
  }

  updateStats(stats: any) {
    this.stats.next(stats);
  }

  getScores(): Observable<any> {
    return this.http.get('https://aim-game-834f0-default-rtdb.europe-west1.firebasedatabase.app/scores.json');
  }
}
