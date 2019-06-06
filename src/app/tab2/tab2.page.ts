import { Component, ViewChild } from '@angular/core';
import { Service } from '../servicios/service';
import { LoadingController, ModalController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page {

@ViewChild('dynamicList') dynamicList;

  listado = [];
  listadoPanel = [];

  constructor(public servicio: Service,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public toastController: ToastController
   ) { }



  ionViewDidEnter() {
    this.servicio.leerListadoProductos().subscribe((querySnapshot) => {
      this.listado = [];
      querySnapshot.forEach((doc) => {
        this.listado.push({ id: doc.id, ...doc.data() });
      });

      this.listadoPanel = this.listado;

    });
  }


    /**
   * 
   * @param msg 
   * @param color 
   * @return Promise con un mensaje de confirmacion de la accion realizada
   */
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Producto añadido',
      duration: 1000,
      position: 'top',
      color: "success"
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
      message: msg
    });
    return await myloading.present();
  }

  initializeItems() {
    this.listadoPanel = this.listado;
  }

  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.listadoPanel = this.listadoPanel.filter((item) => {
        return (item.importe.toString().toLowerCase().indexOf(val.toLowerCase()) > -1 || item.producto.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  actualizarPage() {

    this.servicio.leerListadoProductos().subscribe((querySnapshot) => {
      this.listado = [];
      querySnapshot.forEach((doc) => {
        this.listado.push({ id: doc.id, ...doc.data() });
      });

      this.listadoPanel = this.listado;

    });

  }


    /**
   * 
   * @param refresher 
   */
  doRefresh(refresher) {

    this.servicio.leerListadoProductos().subscribe(querySnapshot => {
        this.listado = [];
        
        querySnapshot.forEach((doc) => {

          this.listado.push({ id: doc.id, ...doc.data() });
          
        });
        this.listadoPanel = this.listado;

        refresher.target.complete();
      });
}

    /**
   * 
   * @param producto 
   */
  agregarProductoComanda(producto){

    let cantidad = 1;

    let prod = {
      producto: producto.producto,
      imagen: producto.imagen,
      precio: producto.precio,
      cantidad: cantidad,
    }



    this.servicio.agregarProductoComanda(prod);
    this.presentToast();

  
  }



}
