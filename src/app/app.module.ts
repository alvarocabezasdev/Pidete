import { Tab1Page } from './tab1/tab1.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonicStorageModule } from '@ionic/storage';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    
  
  ],
  
  providers: [

    BrowserModule,
    StatusBar,
    SplashScreen,
    HttpClient,
    HttpClientModule,
    BarcodeScanner,
    
    


   

    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
