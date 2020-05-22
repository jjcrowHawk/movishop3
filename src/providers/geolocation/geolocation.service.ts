import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export abstract class GeolocationProvider {

  constructor(public http: HttpClient) {

  }

  helloPolly () {
    console.log("GEO SERVICE: PARENT");
  }

  abstract getLocation (): Promise<{ lat: number, lng: number }>

  abstract getAddressFromLocation (coordinates: { lat: number, lng: number }): Promise<String>
}
