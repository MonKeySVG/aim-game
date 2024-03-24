import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private countdown$: Subject<number> = new Subject<number>();
  private countdownInterval: any;
  countdownValue: number = 30;

  constructor() { }

  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      if (this.countdownValue > 0) {
        this.countdownValue--;
        this.countdown$.next(this.countdownValue);
      } else {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  get countdown(): Observable<number> {
    return this.countdown$.asObservable();
  }
}
