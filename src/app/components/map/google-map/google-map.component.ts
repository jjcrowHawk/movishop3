import { MapComponent } from '../imap';
import { Component, Input } from '@angular/core';
import { GoogleMap, GoogleMapOptions, GoogleMaps, LatLng, Marker, GoogleMapsEvent, Environment } from '@ionic-native/google-maps';
import { Observable } from 'rxjs';

/**
 * Generated class for the GoogleMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-map',
  templateUrl: 'google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements MapComponent {

  loadingMap: boolean = false;
  showingMapPlaceholder: boolean = false;
  map: GoogleMap;
  markers: { [key: string]: Marker } = {};
  @Input() location: { lat: number; lng: number; };
  @Input() id: string;

  constructor() {
    this.showingMapPlaceholder = true;
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBku2zCTTyXHIUmrMmqNsXqQG-_RmVdFXw',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBku2zCTTyXHIUmrMmqNsXqQG-_RmVdFXw'
    });
  }

  createMap (): Promise<void> {
    this.showingMapPlaceholder = false;
    this.loadingMap = true;
    return new Promise<void>((resolve, reject) => {

      let options: GoogleMapOptions = {
        camera: {
          target: new LatLng(this.location.lat, this.location.lng),
          zoom: 18
        }
      }
      this.map = GoogleMaps.create(this.id, options);
      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        this.loadingMap = false;
        resolve();
      })
    });
  }

  addMarker (coordinates: { lat: number, lng: number }, marker_id: string, icon?: string, draggable?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.map.addMarker({
        icon: icon ? icon : 'red',
        position: coordinates,
        draggable: draggable,
      }).then((marker: Marker) => {
        this.markers[marker_id] = marker
        resolve(marker);
      })
        .catch(error => {
          console.error("ADDMARKER GOOGLE ERROR: " + error);
          reject(error);
        });
    })
  }

  changeMarkerLocation (marker: Marker, coordinates: { lat: number, lng: number }) {
    marker.setPosition(coordinates);
  }
  removeMarker (marker: any) {
    throw new Error("Method not implemented.");
  }

  subscribeMapEvent (event: string): Observable<any[]> {
    return this.map.on(event);
  }

  subscribeMarkerEvent (marker: any, event: string) {
    throw new Error("Method not implemented.");
  }

}
