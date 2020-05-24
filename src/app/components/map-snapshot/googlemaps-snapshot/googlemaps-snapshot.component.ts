import { MapSnapshotComponent } from './../map-snapshot';
import { Coordinates, ICoordinates } from './../../../types/coordinates';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the GooglemapsSnapshotComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'googlemaps-snapshot',
  templateUrl: 'googlemaps-snapshot.html',
  styleUrls: ['./googlemaps-snapshot.scss']
})
export class GooglemapsSnapshotComponent implements MapSnapshotComponent {

  @Input() location: ICoordinates;
  @Input() src: string;

  constructor() {
    console.log('Hello GooglemapsSnapshotComponent Component');
  }

  renderSnapshot (options?: { [key: string]: any }) {
    this.src =
      `https://maps.googleapis.com/maps/api/staticmap?center=${this.location.lat},${this.location.lng}
      &zoom=${options && options.zoom ? options.zoom : '17'}
      &size=${options && options.size ? options.size.join('x') : '400x250'}
      &markers=${options && options.marker ? `color:${options.marker.color}%7Clabel:${options.marker.label}%7C${options.marker.location.lat, options.marker.location.lng}` : `color:red%7Clabel:S%7C${this.location.lat},${this.location.lng}`}
      &key=AIzaSyBku2zCTTyXHIUmrMmqNsXqQG-_RmVdFXw`;
  }

}
