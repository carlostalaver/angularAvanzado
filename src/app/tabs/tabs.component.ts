import { Component, OnInit, ContentChild, AfterContentInit, OnDestroy } from '@angular/core';
import { TabComponent } from "app/tab/tab.component";
import { ITab } from 'app/tab/Itab.interface';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {

  /* OJO:  el array tabs lo cargo desde el componente hijo, ver tab.component.ts metodo ngOnInit() */
  public tabs:ITab[] = []; 

  /*Accediendo desde el componente padre al componente hijo */
  @ContentChild(TabComponent) tabHijo: TabComponent;/* tabHijo toma la referencia al primer elemento <app-tab> PROYECTADO (con <ng-content>)
                                                    en la vista del componente TabsComponent, asi que pudiera acceder a sus propiedades y metodos si lo quisiera*/
  eventoClickSubscripcion: Subscription =  null;

  constructor() { }

  ngOnInit() {
    
  }

  addTab(tab:ITab){
    if (this.tabs.length === 0) {
      tab.isActive = true;
    }
    this.tabs.push(tab);
  }

  selectTab(tab:ITab) {
    for (let tab of this.tabs){
      tab.isActive = false;
    }
    tab.isActive = true;
  }
  
  ngAfterContentInit(): void {
    if(this.tabHijo){
      this.addTab(this.tabHijo);
      this.eventoClickSubscripcion = this.tabHijo.eventoClick.subscribe(() => {
        console.warn('El elemento ha sido clickeado..!');        
      })
    }
  }

  ngOnDestroy(): void {
    if (this.eventoClickSubscripcion) {
      this.eventoClickSubscripcion.unsubscribe();
    }
  }

}
