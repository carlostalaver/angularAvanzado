import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-simple-alert-view',
  templateUrl: './simple-alert-view.component.html',
  styleUrls: ['./simple-alert-view.component.scss']
})
export class SimpleAlertViewComponent implements OnInit {

  constructor() { }

  @Input() message:string;
  @Input() title:string;
  public visible:boolean = false;
  @Output() cerrarAlerta: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
  }

  public dismiss(){
    this.visible = false;
    this.cerrarAlerta.emit();
  }

  public show(){
    this.visible = true;
  }  

}
