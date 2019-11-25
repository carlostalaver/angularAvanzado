import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { TimerService } from './timer.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class TimerComponent implements OnInit, OnDestroy {

  @Input() init: number = 20;
  @Output() onComplete = new EventEmitter<void>();
  private countDonwEndSubscription: Subscription = null;
  private countDonwSubscription: Subscription = null;
  valorInicial: number = 0;

  constructor(public timerService: TimerService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.timerService.restartCountdown(this.init)
    
    this.countDonwSubscription = this.timerService.countdown$.subscribe(value => {
      this.valorInicial = value;
      this.changeDetectorRef.markForCheck();
    })

    this.countDonwEndSubscription = this.timerService.countDownEnd$.subscribe(() => {
      console.warn('contador en cero --Desde el Timer.companent.ts--');
      this.onComplete.emit();
    })

  }

  ngOnDestroy(): void {
    // destroy del timer
    console.warn('DESTRUYENDO EL COMPONENTE TIMER');    
    this.timerService.destroyPersonalizado();
    this.countDonwEndSubscription.unsubscribe();
    this.countDonwSubscription.unsubscribe();
  }

  get progress() {
    return (this.init - this.valorInicial) / this.init * 100;
  }
}
