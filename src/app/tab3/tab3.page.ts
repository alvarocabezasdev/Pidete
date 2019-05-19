import { Component } from '@angular/core';
import { Service } from '../servicios/service';
import { LoadingController, ModalController } from '@ionic/angular';
import { Scan } from '../servicios/scan';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  listado = [];
  listadoPanel = [];


  constructor(public servicio: Service,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public scan: Scan
   
    
   ) {

    this.presentLoading("Cargando...");

    this.loadingController.dismiss();
    this.listadoPanel = this.servicio.leerComanda();
   

   }

   ionViewWillEnter() {

    this.listadoPanel = this.servicio.leerComanda();
        

  }

  ionViewDidEnter(){
    this.listadoPanel = this.servicio.leerComanda();

  }

  async presentLoading(msg) {
    let myloading = await this.loadingController.create({
      message: msg,
      duration: 2000,
    });
    return await myloading.present();
}

  borrarUnidad(producto){
    console.log(producto);
  }

  totalComanda(){

    let total:number = 0;

    for (let producto of this.listadoPanel) {
      total = total + producto.precio;
  }
    return total;

  }


}