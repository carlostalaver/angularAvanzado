import { Component, Output, EventEmitter, AfterContentInit, ViewChildren, QueryList, AfterViewInit, ViewChild, ElementRef, Renderer2, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
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

  @ViewChild("timeInput") timeInput : ElementRef;
  @ViewChild("alertDinamico", {read: ViewContainerRef}) alertDinamico : ViewContainerRef;
  simpleAlert:  ComponentRef<SimpleAlertViewComponent> = null;

  constructor( private renderer: Renderer2, private resolver: ComponentFactoryResolver) {
    this.timers = [3, 20, 185]
  }

  logCountDownEnd() {
    console.warn('El contador finalizó --Desde el app.component.ts--!!!');
  }
  
  showAddTimer() {
    this.isAddTimerVisible = true;
    /* lo meto en un setTimeout para que angular se pueda dar cuenta de que  this.timeInput.nativeElement cambió*/
    setTimeout(() => {
      this.renderer.selectRootElement(this.timeInput.nativeElement).focus()
    }, 2);
  }

  hideAddTimer() {
    this.isAddTimerVisible = false;
  }

  showEndTimerAlert() {
    //TODO mostar alerta
    const alertDinamicoFactory = this.resolver.resolveComponentFactory(SimpleAlertViewComponent);
    this.simpleAlert = this.alertDinamico.createComponent(alertDinamicoFactory);
    this.simpleAlert.instance.title="Titulo dado desde la creación dinamíca del componente";
    this.simpleAlert.instance.message = "Mensaje dado desde la creación dinamíca del componente";
    this.simpleAlert.instance.cerrarAlerta
      .subscribe( () => {
        this.simpleAlert.destroy();
        console.log('Cerrando la ventana de alerta..!!!');
        
      })
    this.simpleAlert.instance.show();
  }

  submitAddTimer(){
    this.timers.push(this.time);
    this.hideAddTimer();
  }

  ngAfterContentInit(): void {

  }

  ngAfterViewInit(): void {

  }

}
