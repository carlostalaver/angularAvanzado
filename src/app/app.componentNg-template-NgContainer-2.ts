import { Component, Output, EventEmitter, AfterContentInit, ViewChildren, QueryList, AfterViewInit, ViewChild, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, AfterViewInit {

  isAddTimerVisible: boolean = false;
  time: number = 0;
  timers: Array<number> = [];
 
  @Output() onSubmit = new EventEmitter<number>(); 

  alertTitle: string = 'Mi titulo';

  @ViewChildren(SimpleAlertViewComponent) alerts: QueryList<SimpleAlertViewComponent>;
  @ViewChild("timeInput") timeInput : ElementRef;

  constructor(public cdRef: ChangeDetectorRef, private renderer: Renderer2) {
    this.timers = [3, 20, 185]
  }

  logCountDownEnd() {
    console.warn('El contador finalizó --Desde el app.component.ts--!!!');
  }
  
  showAddTimer() {
    this.isAddTimerVisible = true;
    /* lo meto en sun setTimeout para que angular se pueda dar cuenta de que  this.timeInput.nativeElement cambió*/
    setTimeout(() => {
      this.renderer.selectRootElement(this.timeInput.nativeElement).focus()
    }, 2);
  }

  hideAddTimer() {
    this.isAddTimerVisible = false;
  }

  showEndTimerAlert() {
    //TODO mostar alerta
    this.alerts.first.show();
  }

  submitAddTimer(){
    this.timers.push(this.time);
    this.hideAddTimer();
  }

  ngAfterContentInit(): void {

  }

  ngAfterViewInit(): void {
    console.warn(this.timeInput);
    this.renderer.setAttribute(this.timeInput.nativeElement,"placeholder","Por favor introducir los segundos");
    this.renderer.addClass(this.timeInput.nativeElement,"time-in");
    
    this.alerts.forEach(alert => {
      if(!alert.title){
          alert.title =  "Hola desde el app.component.ts";
          alert.message = "Hola 2 desde el app.component.ts"
      }
    });
    this.cdRef.detectChanges()
  }

}
