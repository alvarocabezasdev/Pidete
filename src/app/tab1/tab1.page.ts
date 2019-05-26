import { Service } from './../servicios/service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  mesa: any;
  listadoPanel = [];
  listado = [];
  cantidad: number = 0;

  constructor(public servicio: Service){
    this.mesa = this.getMesa();

  }


  ionViewWillEnter(){
    this.mesa = this.getMesa();
    
  }

  ionViewDidEnter(){
    this.mesa = this.getMesa();

    this.servicio.leerMesa(this.mesa).subscribe((querySnapshot) => {
      this.listado = [];
      querySnapshot.forEach((doc) => {
        this.listado.push({ id: doc.id, ...doc.data() });
      });

      this.listadoPanel = this.listado;

    });
  }


  getMesa(){
    
    this.servicio.getMesa().then((value)=>{
      this.mesa = value;
    })
  }

  totalComanda(){

    let total:number = 0;

    for (let producto of this.listadoPanel) {
      total = total + producto.precio;
      this.cantidad = this.cantidad + producto.cantidad;
  }
    return total;
    

  }



  pedirCuenta(){

    this.servicio.pediCuenta(this.mesa);

  }



}
