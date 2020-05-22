import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeolocationProvider } from './../geolocation.service';
import { Environment, LocationService, Geocoder, GeocoderResult } from '@ionic-native/google-maps';

/*
  Generated class for the GoogleGeolocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleGeolocationProvider extends GeolocationProvider {

  constructor(public http: HttpClient) {
    super(http);

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBku2zCTTyXHIUmrMmqNsXqQG-_RmVdFXw',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBku2zCTTyXHIUmrMmqNsXqQG-_RmVdFXw'
    });

  }

  helloPolly () {
    console.log("GEO SERVICE: SAYING HELLO FROM GOOGLE GEOLOCATION CHILDREN");
  }

  getLocation (): Promise<{ lat: number; lng: number; }> {
    return new Promise((resolve, reject) => {
      LocationService.getMyLocation({ enableHighAccuracy: true }).then(location => {
        resolve(location.latLng);
      }, error => {
        reject(error);
      })
    });
  }

  getAddressFromLocation (coordinates: { lat: number, lng: number }): Promise<String> {
    return new Promise((resolve, reject) => {
      Geocoder.geocode({
        position: coordinates,
      }).then((result: GeocoderResult[]) => {
        //console.log("geocoder: " + JSON.stringify(result));
        let address = '';
        if (result.length > 1) {
          address = result.reduce<string>((preValue, currentValue, index, array) => {
            let newString = preValue
            //@ts-ignorec
            if (currentValue.extra.types && ['street_address', 'route', 'neighborhood'].includes(currentValue.extra.types[0]))
              newString += `${index == 0 ? "" : ","} ${currentValue.extra.lines[0]}`;

            return newString;
          }, '');
        }
        else if (result.length == 1) {
          address = result[0].extra.lines.join(", ")
        }
        resolve(address);
      })
        .catch((error) => {
          console.error("geocoder error: ", error);
          resolve('');
        });
    })
  }
}
