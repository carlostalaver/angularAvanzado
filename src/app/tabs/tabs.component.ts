import { Component, OnInit, ContentChildren, AfterContentInit, OnDestroy, QueryList } from '@angular/core';
import { TabComponent } from "app/tab/tab.component";
import { ITab } from 'app/tab/Itab.interface';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {

  /*Accediendo desde el componente padre al componente hijo */
  @ContentChildren(TabComponent) public tabs: QueryList<TabComponent>;/* tabs toma las referencias de los elementos <app-tab> PROYECTADO (con <ng-content>)
                                                                   en la vista del componente TabsComponent, asi que pudiera acceder a sus propiedades y metodos si lo quisiera*/
  eventoClickSubscripcions: Subscription[] = [];

  constructor() { }

  ngOnInit() {

  }

  selectTab(tab: ITab) {
    this.tabs.forEach(tab => {
      tab.isActive = false;
    });
    tab.isActive = true;
  }

  ngAfterContentInit(): void {
    this.tabs.forEach((tab, index) => {

      this.eventoClickSubscripcions[index] = tab.eventoClick.subscribe(() => {
        console.log(`Clieck en ${tab.title}`);
      })
      //this.eventoClickSubscripcions.push(subscripcion)
    });
    this.selectTab(this.tabs.first);
  }

  ngOnDestroy(): void {
    if (this.eventoClickSubscripcions.length) {
      this.eventoClickSubscripcions.forEach(evento => {
        evento.unsubscribe();
      })
    }
  }

}
