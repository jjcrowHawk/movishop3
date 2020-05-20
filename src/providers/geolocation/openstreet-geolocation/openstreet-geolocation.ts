import { GeolocationProvider } from './../geolocation.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the OpenstreetGeolocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OpenStreetGeolocationProvider extends GeolocationProvider {

  constructor(public http: HttpClient) {
    super(http);
    console.log('Hello OpenstreetGeolocationProvider Provider');
  }

  helloPolly () {
    console.log("GEOLOCATION PROVIDER: OPENSTREETMAPS");
  }
  getLocation (): Promise<{ lat: number; lng: number; }> {
    throw new Error("Method not implemented.");
  }
  getAddressFromLocation (coordinates: { lat: number; lng: number; }): Promise<String> {
    throw new Error("Method not implemented.");
  }

}
