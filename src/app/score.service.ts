import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scoreSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

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
}
