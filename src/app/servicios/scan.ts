import { Service } from './service';
import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

export class Scan {


  constructor(private barcodeScanner: BarcodeScanner,
              public servicio: Service,
              public navController: NavController
              ) { }


  scan(){
      
  this.barcodeScanner.scan().then(barcodeData => {

    this.servicio.mandarComanda(this.servicio.leerComanda(),barcodeData.text);
    this.servicio.setMesa(barcodeData.text);
    this.servicio.borrarComanda();
    this.navController.navigateRoot("./tab1/tab1.page.ts");


  }).catch(err => {
      console.log('Error', err);
  });
  
  }
  







}