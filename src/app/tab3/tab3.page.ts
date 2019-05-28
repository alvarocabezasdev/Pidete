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

    //this.presentLoading("Cargando...");

    //this.loadingController.dismiss();
    this.listadoPanel = this.servicio.leerComanda();
   
   }

   ionViewWillEnter() {

    this.listadoPanel = this.servicio.leerComanda();
        

  }

  ionViewDidEnter(){
    this.listadoPanel = this.servicio.leerComanda();

  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      position: 'top',
      color: 'danger'
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

  totalComanda(){

    let total:number = 0;

    for (let producto of this.listadoPanel) {
      total = total + producto.precio;
  }
    return total;
    

  }

  getCantidad(){
    return this.cantidad;
  }

  activarBoton(){
    if(this.totalComanda()>0){
      return false;
    }else{
      return true;
    }
  }

  borrarUnidad(producto){

    this.servicio.borrarUnidad(producto);
 

    this.presentToast("Producto eliminado");

    this.totalComanda();
    this.getCantidad();


  }


}