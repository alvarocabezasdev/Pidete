import { Component } from '@angular/core';
import { Service } from '../servicios/service';
import { LoadingController, ModalController } from '@ionic/angular';

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
    public modalController: ModalController
   ) {

    this.presentLoading("Cargando...");
    this.loadingController.dismiss();
    this.listadoPanel = this.servicio.leerComanda();
   

   }

   ionViewWillEnter() {

    this.listadoPanel = this.servicio.leerComanda();
        

  }

  async presentLoading(msg) {
    let myloading = await this.loadingController.create({
      message: msg,
      duration: 2000,
    });
    return await myloading.present();
}


}