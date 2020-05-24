import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeolocationService } from '../geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class OpenstreetGeolocationService extends GeolocationService {

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
  getAddressFromLocation (coordinates: { lat: number; lng: number; }): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
