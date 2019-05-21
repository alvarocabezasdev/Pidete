import { Service } from './service';
import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Injectable({
  providedIn: 'root'
})

export class Scan {


  constructor(private barcodeScanner: BarcodeScanner,
              public servicio: Service
              ) { }


  scan(){
      
  this.barcodeScanner.scan().then(barcodeData => {

    this.servicio.mandarComanda(this.servicio.leerComanda(),barcodeData.text);
    this.servicio.setMesa(barcodeData.text);


  }).catch(err => {
      console.log('Error', err);
  });
  
  }
  







}