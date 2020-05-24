import { Address } from './../../../app/types/address';
import { AddressService } from './../address/address.service';
import { UserSettingsService } from './../../services/user-settings/user-settings.service';
import { IOrder, IOrderState } from './../../../app/types/order';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(public http: HttpClient, private settingsService: UserSettingsService, private addressService: AddressService) {
    console.log('Hello OrdersProvider Provider');
  }

  getCustomerOrders (): Observable<HttpResponse<{ [key: string]: IOrder[] }>> {
    let id_customer = this.settingsService.settings.id_customer;
    return this.http.get<{ [key: string]: IOrder[] }>(environment.api.orders, {
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
    return this.http.get<{ [key: string]: IOrderState[] }>(environment.api.order_state, {
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
