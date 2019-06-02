import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class Service {

  productos: AngularFirestoreCollection<any>;
  mesa: AngularFirestoreCollection<any>;
  mesaLocalStorage: string;
  value: string;

  comanda = [];
  listado = [];

 

  constructor(private fireStore: AngularFirestore,
    private http: HttpClient,
    private storage: Storage,
    
    ) {

    this.productos = fireStore.collection<any>(environment.firebaseConfig.productos);

  }

  //PRODUCTOS

    /**
   * 
   * 
   * @return Observable con el objeto Firestore productos
   */
  leerListadoProductos(): Observable<firebase.firestore.QuerySnapshot> {
    console.log(this.productos.get());
    return this.productos.get();
  }

   /**
   * @return Observable con el objeto Firestore productos al añadir un producto
   */
  agregarRegistro(datos): Promise<firebase.firestore.DocumentReference> {
    return this.productos.add(datos);
  }

   /**
   * @return Observable con el objeto Firestore productos al borrar un producto
   */
  borrarRegistro(id): Promise<void>{
    
  return this.productos.doc(id).delete();
    
}

  //PRODUCTOS


  //COMANDA

  /**
   * @param producto
   * 
   */
  agregarProductoComanda(producto){
    
    this.comanda.push(producto);

  }

  /**
   * @return Array con listado de productos de la comanda
   * 
   */
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

  /**
   * @param listado
   * @param mesa
   * 
   */
  mandarComanda(listado, mesa){

    switch(mesa){
      case "mesa1": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.mesa1);break;
      case "mesa2": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.mesa2);break;
      case "mesa3": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.mesa3);break;
      case "mesa4": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.mesa4);break;

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

  

  borrarComanda(){
    
  this.comanda.splice(0,this.comanda.length);
    
}

  /**
   * @param item
   * 
   */

  borrarUnidad(item){
    if(item.cantidad==1){
      this.comanda.splice(this.comanda.indexOf(item),1);
    }else{
      
      this.comanda[this.comanda.indexOf(item)].precio = this.comanda[this.comanda.indexOf(item)].precio -
      this.comanda[this.comanda.indexOf(item)].precio/this.comanda[this.comanda.indexOf(item)].cantidad;
      this.comanda[this.comanda.indexOf(item)].cantidad = this.comanda[this.comanda.indexOf(item)].cantidad -1;


    }
  }

    /**
   * @return Observable con el objeto Firestore productos 
   * 
   */

  leerComandas(){
    return this.productos.get();
  }

  //COMANDA

  //MESA

   /**
   * @param mesa
   * @return Observable con el objeto Firestore mesa 
   * 
   */
  leerMesa(mesa):  Observable<firebase.firestore.QuerySnapshot> {
   
    switch(mesa){
      case "mesa1": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.mesa1);break;
      case "mesa2": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.mesa2);break;
      case "mesa3": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.mesa3);break;
      case "mesa4": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.mesa4);break;

    }

    console.log(this.mesa.get());

    return this.mesa.get();

  }

   /**
   * @param mesa
   * @return Promise con el objeto Firestore mesa al borrar los un producto de la mesa
   * 
   */  

  borrarMesa(id): Promise<void>{
    
  return this.mesa.doc(id).delete();
    
}

  resetLocalMesa(){
    this.storage.set('mesa', "");
  }
 
   /**
   * @param mesa
   * 
   * 
   */  
  setMesa(mesa:string){
    
    this.storage.set('mesa', mesa);  
    
  }

  /**
   * Obtiene el valor de mesa en local storage y lo setea a mesalocalstorage
   * @param mesa
   * @return String con el valor del campo mesa en la base de datos local
   * 
   */  
  
  getMesa(){

    return this.storage.get('mesa');

  }



  //MESA

  //CUENTA

    /**
   * @param mesa
   * 
   */  
  pediCuenta(mesa){

    switch(mesa){
      case "mesa1": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.cuentaMesa1);break;
      case "mesa2": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.cuentaMesa2);break;
      case "mesa3": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.cuentaMesa3);break;
      case "mesa4": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.cuentaMesa4);break;

    }

    let cuenta = {
      cuenta: true,
    }

    this.mesa.get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        
        this.mesa.doc(doc.id).update(cuenta);
      
      });

    });

    

  }

    /**
   * @param mesa
   * @return Observable con el objeto Firestore mesa
   * 
   */  

  cuentaPedida(mesa){

    switch(mesa){
      case "mesa1": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.cuentaMesa1);break;
      case "mesa2": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.cuentaMesa2);break;
      case "mesa3": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.cuentaMesa3);break;
      case "mesa4": this.mesa = this.fireStore.collection<any>(environment.firebaseConfig.cuentaMesa4);break;

    }

    return this.mesa.get();
  }



  //CUENTA


}

