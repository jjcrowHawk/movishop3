import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class GeolocationService {

  constructor(public http: HttpClient) {

  }

  helloPolly () {
    console.log('GEO SERVICE: PARENT');
  }

  abstract getLocation (): Promise<{ lat: number, lng: number }>;

  abstract getAddressFromLocation (coordinates: { lat: number, lng: number }): Promise<string>;
}
