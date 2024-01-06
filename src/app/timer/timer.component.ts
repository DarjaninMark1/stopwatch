import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() durationInSeconds: number = 0;

  @Input() id: Number = -1 ;
  @Input() name: string = 'NoName' ;


  private timerSubscription!: Subscription;
  private remainingTime: number = 0;
  timeString: string = '00:00:00';

  ngOnInit() {
    this.remainingTime = this.durationInSeconds;

    this.updateTimeString(this.durationInSeconds)
  }

  ngOnDestroy() {
    this.stopTimer();
  }


  isRunning(): boolean {
    // return this._isRunning;
    return true
  }

  startTimer() {
    const timer = interval(1000);
    this.timerSubscription = timer.subscribe(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.updateTimeString(this.remainingTime);
      } else {
        // Handle timer completion if needed
        this.stopTimer();
      }
    });
  }

  stopTimer() {
    console.log("stop timer")
    if (this.timerSubscription) {
      console.log( this.timerSubscription)
    console.log("stop timer 01")
      this.timerSubscription.unsubscribe();
    }
  }

  private updateTimeString(seconds: number): void {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    this.timeString = `${this.formatTimeUnit(hours)}:${this.formatTimeUnit(minutes)}:${this.formatTimeUnit(remainingSeconds)}`;
  }

  private formatTimeUnit(unit: number): string {
    return unit < 10 ? `0${unit}` : unit.toString();
  }
}
