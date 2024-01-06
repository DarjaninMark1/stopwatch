// stopwatch.component.ts
import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit, OnDestroy {

  @Input() durationInSeconds: number = 0;

  @Input() id: Number = -1 ;
  @Input() name: string = 'NoName' ;

  @Output() stopwatchCompleted = new EventEmitter<void>();


  private stopwatchSubscription!: Subscription;
  private startTime: number = Date.now();
  timeString: string = '00:00:00';
  private _isRunning: boolean = false; // Added property to track running state
  time = 0;


  ngOnInit() {
    this.time = this.durationInSeconds
    this.updateTimeString(this.durationInSeconds)
    // this.startStopwatch()
    // No automatic start, start method will be called from the parent
  }

  ngOnDestroy() {
    this.stopStopwatch();
  }

  startStopwatch() {
    this._isRunning = true; // Update running state
    const timer = interval(1000);
    this.stopwatchSubscription = timer.subscribe(() => {
      this.time++;
      this.updateTimeString(this.time)
    });
  }

  stopStopwatch() {
    this._isRunning = false; // Update running state
    if (this.stopwatchSubscription) {
      this.stopwatchSubscription.unsubscribe();
      this.stopwatchCompleted.emit(); // Notify parent when stopwatch stops
    }
  }

  isRunning(): boolean {
    return this._isRunning;
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
