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
  mesa: AngularFirestoreCollection<any>;


  comanda = [];

 

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
    return this.comanda;
  }

  //COMANDA


}