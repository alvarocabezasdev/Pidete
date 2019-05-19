import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Injectable({
  providedIn: 'root'
})

export class Scan {


  constructor(private barcodeScanner: BarcodeScanner) { }


  scan(){
      
  this.barcodeScanner.scan().then(barcodeData => {
    
   console.log('Barcode data', barcodeData);

  }).catch(err => {
      console.log('Error', err);
  });
  
  }
  







}