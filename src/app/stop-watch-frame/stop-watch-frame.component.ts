import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ComponentData } from '../models/component-data.model';
import { TimerComponent } from '../timer/timer.component';
import { StopwatchComponent } from '../stopwatch/stopwatch.component';

@Component({
  selector: 'app-stop-watch-frame',
  templateUrl: './stop-watch-frame.component.html',
  styleUrls: ['./stop-watch-frame.component.scss']
})

export class StopWatchFrameComponent implements OnInit, OnDestroy {
  componentDataList: ComponentData[] = [
    { id: 1, type: 'stopwatch', durationInSeconds: 500, name: 'DataLite', color: 'red'},
    { id: 9, type: 'stopwatch', durationInSeconds: 500, name: 'Project Stopwatch', color: 'green'},
    { id: 4, type: 'stopwatch', durationInSeconds: 500, name: 'Project LinkTree', color: '#72248d'},
    { id: 2,type: 'timer', durationInSeconds: 300, name: 'Break', color: 'blue' }, // 3 seconds for testing
    { id: 11, type: 'timer', durationInSeconds: 500, name: 'Lunch', color: 'pink' }, // 5 seconds for testing
  ];

  @ViewChildren(TimerComponent) timerComponents!: QueryList<TimerComponent>;
  @ViewChildren(StopwatchComponent) stopwatchComponents!: QueryList<StopwatchComponent>;

  // TODO fix
  currentComponentIndex: number = -1;
  currentComponentId: Number = -1;

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  // TODO SET REAL IDS
  getUniqueId(parts: number): string {
    const stringArr = [];
    for(let i = 0; i< parts; i++){
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
  

  startCurrentComponent(index: number, coolId: Number) {
    if (
      index >= 0 
    ) {
      console.log(this.componentDataList)
      console.log(this.componentDataList[index])
      const currentComponentData = this.componentDataList[index];

      if (currentComponentData.type === 'timer') {
        const timerComponent = this.timerComponents.find(component => component.id === coolId);
        if (timerComponent) {
          timerComponent.startTimer();
        }
      } else if (currentComponentData.type === 'stopwatch') {
        const stopwatchComponent = this.stopwatchComponents.find(component => component.id === coolId);
        if (stopwatchComponent) {
          stopwatchComponent.startStopwatch();
        }
      }
    }
  }

  stopCurrentComponent(index: number, coolId: Number) {
    if (
      index >= 0  
    ) {
      const currentComponentData = this.componentDataList[index];

      if (currentComponentData.type === 'timer') {
        const timerComponent = this.timerComponents.find(component => component.id === coolId);
        if (timerComponent) {
          timerComponent.stopTimer();
        }
      } else if (currentComponentData.type === 'stopwatch') {
        const stopwatchComponent = this.stopwatchComponents.find(component => component.id === coolId);
        if (stopwatchComponent) {
          stopwatchComponent.stopStopwatch();
        }
      }
    }
  }

  // TODO flashing screen
  onTimerCompleted() {
  //   this.stopCurrentComponent();
  //   // this.currentComponentIndex++;

  //   if (this.currentComponentIndex < this.componentDataList.length) {
  //     this.startCurrentComponent();
  //   }
  }


  startStopComponent(i: any, id: Number) {
    console.log(this.componentDataList[i])
    // console.log(this.timerComponents)
    // console.log(this.stopwatchComponents)

    if(this.currentComponentIndex != i) {

      this.stopCurrentComponent(this.currentComponentIndex, this.currentComponentId)

      this.startCurrentComponent(i, id)

      this.currentComponentId = id

      // console.log('pust me ' + i)
      this.currentComponentIndex = i

    } else {
      // console.log('zastav me ' + this.currentComponentId)

      // console.log('zastav me ' + this.currentComponentId)

      this.stopCurrentComponent(i, id)

      this.currentComponentId = -1
      this.currentComponentIndex = -1

    }

    
    // this.startCurrentComponent()
    
  }
  
  startStop(i: number): string {
    return this.currentComponentIndex === i ? 'Stop' : 'Start';
  }
  
}