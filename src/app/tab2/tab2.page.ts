import { Component, ViewChild } from '@angular/core';
import { Service } from '../servicios/service';
import { LoadingController, ModalController} from '@ionic/angular';

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
    public modalController: ModalController
   ) { }



  ionViewDidEnter() {
    this.servicio.leeRegistro().subscribe((querySnapshot) => {
      this.listado = [];
      querySnapshot.forEach((doc) => {
        this.listado.push({ id: doc.id, ...doc.data() });
      });

      this.listadoPanel = this.listado;

    });
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

    this.servicio.leeRegistro().subscribe((querySnapshot) => {
      this.listado = [];
      querySnapshot.forEach((doc) => {
        this.listado.push({ id: doc.id, ...doc.data() });
      });

      this.listadoPanel = this.listado;

    });

  }

  doRefresh(refresher) {
    this.servicio.leeRegistro().subscribe(querySnapshot => {
        this.listado = [];
        
        querySnapshot.forEach((doc) => {
          this.listado.push({ id: doc.id, ...doc.data() });
        });
        this.listadoPanel = this.listado;

        refresher.target.complete();
      });
}



}
