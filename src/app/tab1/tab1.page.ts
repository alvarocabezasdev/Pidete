import { Service } from './../servicios/service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  mesa: string;

  constructor(public servicio: Service){
    this.getMesa();
  }


  ionViewDidEnter(){
    this.getMesa();

  }


  getMesa(){
    
    this.servicio.getMesa().then((value)=>{
      this.mesa = value;
    })
  }

}
