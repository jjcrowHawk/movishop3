import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GeolocationService } from './services/geolocation/geolocation.service';
import { GeolocationFactory } from './factories/geolocation-factory';
import { GoogleMapComponent } from './components/map/google-map/google-map.component';
import { GooglemapsSnapshotComponent } from './components/map-snapshot/googlemaps-snapshot/googlemaps-snapshot.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapDirective } from './directives/map/map.directive';
import { MapSnapshotDirective } from './directives/map-snapshot/map-snapshot.directive';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx/index';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
    GoogleMapComponent,
    GooglemapsSnapshotComponent
  ],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: GeolocationService, useFactory: (http: HttpClient) => GeolocationFactory(http), deps: [HttpClient] },
    Geolocation,
    NativeGeocoder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
