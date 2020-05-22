import { Address } from './../../../app/types/address';
import { AddressProvider } from './../address/address.service';
import { UserSettingsService } from './../../user-settings/user-settings';
import { IOrder, IOrderState } from './../../../app/types/order';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../enviroments/environment';
import { catchError } from 'rxjs/operators';

/*
  Generated class for the OrdersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrdersProvider {

  constructor(public http: HttpClient, private settingsService: UserSettingsService, private addressService: AddressProvider) {
    console.log('Hello OrdersProvider Provider');
  }

  getCustomerOrders (): Observable<HttpResponse<{ [key: string]: IOrder[] }>> {
    let id_customer = this.settingsService.settings.id_customer;
    return this.http.get<IOrder>(environment.api.orders, {
      params: { ws_key: environment.ws_key, display: 'full', output_format: 'JSON', 'filter[id_customer]': '1' },
      observe: 'response'
    })
      .pipe(
        catchError(error => {
          let message = 'Ha ocurrido un error con el servidor, intente nuevamente';
          return Observable.throw(message);
        })
      )
  }

  getOrderState (state_id): Observable<HttpResponse<{ [key: string]: IOrderState[] }>> {
    return this.http.get<IOrderState>(environment.api.order_state, {
      params: { ws_key: environment.ws_key, display: 'full', output_format: 'JSON', 'filter[id]': state_id, language: '1' },
      observe: 'response'
    })
      .pipe(
        catchError(error => {
          let message = 'Ha ocurrido un error con el servidor, intente nuevamente';
          return Observable.throw(message);
        })
      )
  }

  getOrderDeliveryAddress (address_id): Observable<HttpResponse<{ [key: string]: Address[] }>> {
    return this.addressService.getAddress(address_id);
  }

  getOrderInvoice (invoice_id) {

  }

  getOrderInvoiceAddress (address_id): Observable<HttpResponse<{ [key: string]: Address[] }>> {
    return this.addressService.getAddress(address_id);
  }

}
