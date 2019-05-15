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
   ) { }

   ionViewDidEnter() {

    this.listadoPanel = this.servicio.leerComanda();
    console.log(this.servicio.leerComanda());

  }

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

}