import { Service } from './service';
import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NavController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

export class Scan {

  mesa: any;


  constructor(private barcodeScanner: BarcodeScanner,
              public servicio: Service,
              public navController: NavController,
              public toastController: ToastController
              ) {

               }


  scan(){
      
  this.barcodeScanner.scan().then(barcodeData => {


    this.servicio.getMesa().then((value)=>{
      this.mesa = value;
    })


    if(barcodeData.text==this.mesa){

      this.servicio.mandarComanda(this.servicio.leerComanda(),barcodeData.text);
      this.servicio.borrarComanda();
      this.navController.navigateRoot("tab1");
      this.presentToast("Pedido realizado");
  
  
    }else if(!this.mesa){

      this.servicio.setMesa(barcodeData.text);
      
      this.servicio.getMesa().then((value)=>{
        this.mesa = value;
      })

      this.servicio.mandarComanda(this.servicio.leerComanda(),barcodeData.text);
      this.servicio.borrarComanda();
      this.navController.navigateRoot("tab1");
      this.presentToast("Pedido realizado");


    }else{

      this.navController.navigateRoot("tab3");
      this.presentToast("Escanee el mismo codigo que en el pedido anterior");

    }


  }).catch(err => {
      console.log('Error', err);
  });
  
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      position: 'top',
      color: "success"
    });
    toast.present();
  }
  







}