import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {

  productos: AngularFirestoreCollection<any>;
  mesa: any;


  comanda = [];
  listado = [];

 

  constructor(private fireStore: AngularFirestore,
    private http: HttpClient) {

    this.productos = fireStore.collection<any>(environment.firebaseConfig.productos);
    
  }

  //PRODUCTOS

  leerListadoProductos(): Observable<firebase.firestore.QuerySnapshot> {
    return this.productos.get();
  }

  agregarRegistro(datos): Promise<firebase.firestore.DocumentReference> {
    return this.productos.add(datos);
  }

  borrarRegistro(id): Promise<void>{
    
  return this.productos.doc(id).delete();
    
}

  //PRODUCTOS


  //COMANDA

  agregarProductoComanda(producto){
    
    this.comanda.push(producto);

  }

  leerComanda(){
    for(var i=0; i<this.comanda.length; i++){

      for(var j=i+1; j<this.comanda.length; j++){

        if(this.comanda[i].producto == this.comanda[j].producto){
          this.comanda[i].cantidad = this.comanda[i].cantidad + 1;
          this.comanda[i].precio = this.comanda[i].precio + this.comanda[j].precio;
          this.comanda.splice(j,1);
        }

      }

    }

    return this.comanda;
  
  }

  mandarComanda(listado, mesa){

    switch(mesa){
      case "mesa1": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.mesa1);break;
      case "mesa2": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.mesa2);break;
      case "mesa3": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.mesa3);break;
      case "mesa3": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.mesa4);break;

    }

    for(let producto of listado) {

      let prod = {
        producto: producto.producto,
        precio: producto.precio,
        estado: false,
        cantidad: producto.cantidad,
      }

      this.mesa.add(prod);

    }
    
  }

  borrarComanda(id, mesa): Promise<void>{
    
  return this.productos.doc(id).delete();
    
}

  leerComandas(mesa){
    return this.productos.get();
  }

  //COMANDA


}

