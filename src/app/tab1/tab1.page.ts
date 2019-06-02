import { ToastController } from '@ionic/angular';
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
  cuenta = [];
  listado = [];
  cantidad: number = 0;

  constructor(public servicio: Service,
              public toastController: ToastController){

                this.mesa = this.getMesa();
                console.log(this.mesa);
            
                if(this.mesa==undefined){
                  console.log(this.listadoPanel.length);
                }else{
                  this.servicio.leerMesa(this.mesa).subscribe((querySnapshot) => {
                    this.listado = [];
                    querySnapshot.forEach((doc) => {
                      this.listado.push({ id: doc.id, ...doc.data() });
                    });
              
                    this.listadoPanel = this.listado;
              
                  });
                }
            
                this.servicio.leerMesa(this.mesa).subscribe((querySnapshot) => {
                  this.listado = [];
                  querySnapshot.forEach((doc) => {
                    this.listado.push({ id: doc.id, ...doc.data() });
                  });
            
                  this.listadoPanel = this.listado;
            
                });

  }




  ionViewDidEnter(){
    this.mesa = this.getMesa();
    console.log(this.mesa);

    if(this.mesa==undefined){
      console.log(this.listadoPanel.length);
    }else{
      this.servicio.leerMesa(this.mesa).subscribe((querySnapshot) => {
        this.listado = [];
        querySnapshot.forEach((doc) => {
          this.listado.push({ id: doc.id, ...doc.data() });
        });
  
        this.listadoPanel = this.listado;
  
      });
    }

    this.servicio.leerMesa(this.mesa).subscribe((querySnapshot) => {
      this.listado = [];
      querySnapshot.forEach((doc) => {
        this.listado.push({ id: doc.id, ...doc.data() });
      });

      this.listadoPanel = this.listado;

    });
  }


    /**
   * 
   * @param msg 
   * @return Promise con un mensaje de confirmacion de la accion realizada
   */
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      position: 'top',
      color: "success"
    });
    toast.present();
  }


  getMesa(){
    
    this.servicio.getMesa().then((value)=>{
      this.mesa = value;
    })
  }

  
  /**
   * 
   * @return Number con el valor total de la mesa
   * 
   */  
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
    this.presentToast("Cuenta pedida");
    this.servicio.resetLocalMesa();
    this.listadoPanel = [];

  }


  




}
