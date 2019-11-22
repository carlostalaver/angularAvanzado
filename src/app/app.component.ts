import { Component, Output, EventEmitter, ViewChild, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {

  isAddTimerVisible: boolean = false;
  time: number = 0;
  timers: Array<number> = [];

 
  @Output() onSubmit = new EventEmitter<number>(); 
  isEndTimerAlertVisible: boolean = false;

  alertTitle: string = 'Mi titulo';

  @ViewChild(SimpleAlertViewComponent) alert: SimpleAlertViewComponent;

  constructor(public cdRef: ChangeDetectorRef) {
    this.timers = [3, 20, 185]
  }

  logCountDownEnd() {
    console.warn('El contador finalizó --Desde el app.component.ts--!!!');
  }
  
  showAddTimer() {
    this.isAddTimerVisible = true;
  }

  hideAddTimer() {
    this.isAddTimerVisible = false;
  }

  showEndTimerAlert() {
    this.isEndTimerAlertVisible = true;
  }

  hideEndTimerAlert() {
    this.isEndTimerAlertVisible = false;
  }

  submitAddTimer(){
    this.timers.push(this.time);
    this.hideAddTimer();
  }

  ngAfterContentInit(): void {
    console.warn('El @ViewChind es ', this.alert);
    this.alert.show();
    this.alert.title = 'Este es el titulo'; 
    this.alert.message = 'Este es el mensaje enviado desde app.component.ts en vez del app.component.html'
    //this.cdRef.detectChanges();
  }

/*  this.cdRef.detectChanges(); lo pude haber usado para decirle a angular que detecte los cambios, si la necesidad de 
    implementar el metodo ngAfterContectInit()
  ngAfterViewInit(): void {
    console.warn('El @ViewChind es ', this.alert);
    this.alert.show();
    this.alert.title = 'Este es el titulo'; 
    this.alert.message = 'Este es el mensaje enviado desde app.component.ts en vez del app.component.html'
    this.cdRef.detectChanges();
  } */
}

