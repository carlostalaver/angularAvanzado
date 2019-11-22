import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject'

@Injectable()
export class TimerService {
  private countdownTimerRef:any = null;
  paused: boolean = true;
  public init: number = 0;

  private countDownEndSource = new Subject<void>();
  public countDownEnd$ = this.countDownEndSource.asObservable();

  private countDownSource = new BehaviorSubject<number>(0);
  public countdown$ = this.countDownSource.asObservable();

  constructor() { }


  destroyPersonalizado():void{
    this.clearTimeout();
  }

  restartCountdown(initArg?){
    if(initArg){
      this.init = initArg;
    }
    if(this.init && this.init > 0){
      this.paused = true;
      this.clearTimeout();
      this.countDownSource.next(this.init)
    }
  }

  toogleCountDown(){
    this.paused = !this.paused;

    if(!this.paused){
      this.doCountdown();
    } else {
      this.clearTimeout();
    }
  }

  private doCountdown(){
    this.countdownTimerRef = setTimeout(()=>{
      this.countDownSource.next(this.countDownSource.getValue() -1)
      this.processCountdown();
    }, 1000);
  }

  private processCountdown(){
    if(this.countDownSource.getValue() <= 0){
      this.countDownEndSource.next();
    }
    else{
      this.doCountdown();
    }
  }

  private clearTimeout(){
    if(this.countdownTimerRef){
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }
}
