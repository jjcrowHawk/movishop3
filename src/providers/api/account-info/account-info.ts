import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Customer } from './../../../app/types/customer';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSettingsService } from '../../user-settings/user-settings';
import { environment } from '../../../enviroments/environment.prod';

/*
  Generated class for the AccountInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountInfoProvider {

  constructor(public http: HttpClient, private settingsService: UserSettingsService) {

  }

  getUserInfo (): Observable<HttpResponse<Customer>> {
    let id_customer = this.settingsService.settings.id_customer;
    return this.http.get<Customer>(environment.api.customers,
      {
        params: { 'filter[id]': `[${id_customer}]`, ws_key: environment.ws_key, output_format: 'JSON', id_customer: id_customer, display: 'full' },
        observe: 'response'
      })
      .pipe(
        catchError(error => {
          console.log(error);
          let message = '';
          if (error.status === 0) {
            message = 'Error, no se puede conectar con el servidor. Revise su conexión a internet o intente luego';
          }
          else {
            message = 'Algo salió mal, intente más tarde'
          }

          return Observable.throw(message);
        })
      )

  }

  updateCustomer (user: Customer): Observable<HttpResponse<any>> {
    return Observable.of(new HttpResponse({ body: { success: true }, status: 200 }))
  }

  updatePassword (password, newpassword): Observable<HttpResponse<any>> {
    return Observable.of(new HttpResponse({ body: { success: true }, status: 200 }))
  }

}
