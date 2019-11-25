import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITab } from './Itab.interface';
import { TabsComponent } from 'app/tabs/tabs.component';


@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, ITab {

  @Input() title: string;
  @Output() eventoClick: EventEmitter<void> = new EventEmitter<void>();
  public isActive: boolean = false;


  //#region para trabajar con dependencia de inyecciones, accediendo desde el HIJO al PADRE
  /* Inyecto una referencia del componente padre o contenedor 
  constructor(public componentPadre: TabsComponent) { }
  */

  /* Lamada al metodo addTab del componente padre, NOTAR que le estoy pasando una referencia del componente TabComponent recien instanciado 
   ngOnInit() {
     this.componentPadre.addTab(this);
   }
   */
  //#endregion

  constructor() { }

  ngOnInit() {
  }

  clickTabContent(){
    this.eventoClick.emit();
  }
}
