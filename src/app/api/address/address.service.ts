import { environment } from './../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserSettingsService } from './../../services/user-settings/user-settings.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../../../app/types/address';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(public http: HttpClient, private settingsService: UserSettingsService) {
    console.log('Hello AddressProvider Provider');
  }

  getAddresses (): Observable<HttpResponse<Address>> {
    const id_customer = this.settingsService.settings.id_customer;
    return this.http.get<Address>(environment.api.addresses, {
      params: { ws_key: environment.ws_key, display: 'full', output_format: 'JSON', 'filter[id_customer]': id_customer, 'filter[deleted]': '[0]' },
      observe: 'response'
    })
      .pipe(
        catchError(error => {
          const message = 'Ha ocurrido un error con el servidor, intente nuevamente';
          return Observable.throw(message);
        })
      );
  }

  getAddress (address_id): Observable<HttpResponse<{ [key: string]: Address[] }>> {
    return this.http.get<{ [key: string]: Address[] }>(environment.api.addresses, {
      params: { ws_key: environment.ws_key, display: 'full', output_format: 'JSON', 'filter[id]': address_id },
      observe: 'response'
    })
      .pipe(
        catchError(error => {
          const message = 'Ha ocurrido un error con el servidor, intente nuevamente';
          return Observable.throw(message);
        })
      );
  }

  getStates (): Observable<any> {
    return this.http.get('../../assets/data/ecuador_provinces.json');
  }

  getCities (state_id: number): Observable<any> {
    return this.http.get('../../assets/data/ecuador_cities.json');/*.filter(
      //@ts-ignore
      //city => city.intCodigoProvinciaInen === state_id
    )*/
  }

  editAddress (address: any): Observable<HttpResponse<any>> {
    return of(new HttpResponse({ body: { success: true }, status: 200 }));
  }

  deleteAddress (address: any): Observable<HttpResponse<any>> {
    return of(new HttpResponse({ body: { success: true }, status: 200 }));
  }
}
