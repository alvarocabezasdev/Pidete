import { Component } from '@angular/core';
import { Service } from '../servicios/service';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Scan } from '../servicios/scan';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  listado = [];
  listadoPanel = [];
  cantidad = 0;


  constructor(public servicio: Service,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public scan: Scan,
    public toastController: ToastController
   
    
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Producto añadido',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
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
      this.cantidad = this.cantidad + producto.cantidad;
  }
    return total;

  }

  getCantidad(){
    return this.cantidad;
  }


}