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
      color: 'danger'
    });
    toast.present();
  }


    /**
   * 
   * @param msg 
   * @return Promise con un loading
   */
  async presentLoading(msg) {
    let myloading = await this.loadingController.create({
      message: msg,
      duration: 2000,
    });
    return await myloading.present();
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
  }
    return total;
    

  }

    /**
   * 
   * @return Cantidad
   * 
   */  
  getCantidad(){
    return this.cantidad;
  }

  /**
   * 
   * @return True o False dependiendo del total de mesa es mayor que 0
   * 
   */  
  activarBoton(){
    if(this.totalComanda()>0){
      return false;
    }else{
      return true;
    }
  }

  /**
   * 
   * @param producto
   * 
   */  
  borrarUnidad(producto){

    this.servicio.borrarUnidad(producto);
 

    this.presentToast("Producto eliminado");

    this.totalComanda();
    this.getCantidad();


  }


}