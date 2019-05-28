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
      this.navController.navigateRoot("tabs/tab1");
      this.presentToast("Pedido realizado", "success");
  
  
    }else if(this.mesa==undefined){

      this.servicio.setMesa(barcodeData.text);
      
      this.servicio.getMesa().then((value)=>{
        this.mesa = value;
      })

      this.servicio.mandarComanda(this.servicio.leerComanda(),barcodeData.text);
      this.servicio.borrarComanda();
      this.navController.navigateRoot("tabs/tab1");
      this.presentToast("Pedido realizado", "success");


    }else{

      this.presentToast("Escanee el mismo codigo que en el pedido anterior", "danger");
      this.navController.pop();
    }


  }).catch(err => {
      console.log('Error', err);
  });
  
  }

  async presentToast(msg, color) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      position: 'top',
      color: color
    });
    toast.present();
  }
  







}