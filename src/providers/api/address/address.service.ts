import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserSettingsService } from './../../user-settings/user-settings';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/environment';
import { Address } from '../../../app/types/address';
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';

/*
  Generated class for the AddressProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddressProvider {

  constructor(public http: HttpClient, private settingsService: UserSettingsService) {
    console.log('Hello AddressProvider Provider');
  }

  getAddresses (): Observable<HttpResponse<Address>> {
    let id_customer = this.settingsService.settings.id_customer;
    return this.http.get<Address>(environment.api.addresses, {
      params: { ws_key: environment.ws_key, display: 'full', output_format: 'JSON', 'filter[id_customer]': id_customer, 'filter[deleted]': '[0]' },
      observe: 'response'
    })
      .pipe(
        catchError(error => {
          let message = 'Ha ocurrido un error con el servidor, intente nuevamente';
          return Observable.throw(message);
        })
      )
  }

  getAddress (address_id) {
    return this.http.get<Address>(environment.api.addresses, {
      params: { ws_key: environment.ws_key, display: 'full', output_format: 'JSON', 'filter[id]': address_id },
      observe: 'response'
    })
      .pipe(
        catchError(error => {
          let message = 'Ha ocurrido un error con el servidor, intente nuevamente';
          return Observable.throw(message);
        })
      )
  }

  getStates (): Observable<any> {
    return this.http.get("../../assets/data/ecuador_provinces.json")
  }

  getCities (state_id: number): Observable<any> {
    return this.http.get("../../assets/data/ecuador_cities.json")/*.filter(
      //@ts-ignore
      //city => city.intCodigoProvinciaInen === state_id
    )*/
  }

  editAddress (address: any): Observable<HttpResponse<any>> {
    return Observable.of(new HttpResponse({ body: { success: true }, status: 200 }))
  }

  deleteAddress (address: any): Observable<HttpResponse<any>> {
    return Observable.of(new HttpResponse({ body: { success: true }, status: 200 }))
  }

}
