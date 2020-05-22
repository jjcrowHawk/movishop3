import { UserSettingsService } from './../../user-settings/user-settings';
import { Customer } from './../../../app/types/customer';
import { environment } from './../../../enviroments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  isAuthenticated: boolean = false;

  constructor(public http: HttpClient, private userSettings: UserSettingsService) {
    console.log('Hello LoginProvider Provider');
  }

  login (email, password): Observable<HttpResponse<Customer>> {
    return this.http
      .get<Customer>(environment.api.customers,
        {
          params: { 'filter[email]': email, 'filter[passwd]': password, 'filter[active]': '1', 'filter[deleted]': '0', 'output_format': 'JSON', ws_key: environment.ws_key, display: '[id,secure_key]' },
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

  logout () {
    this.destroyCredentials();
  }

  checkAuthenticated () {
    let credentials = JSON.parse(window.localStorage.getItem('user') || '{}');
    if (credentials.id) {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }

  storeUserCredentials (user) {
    window.localStorage['user'] = JSON.stringify(user);
    this.useCredentials(user);
  }

  loadUserCredentials () {
    var user = JSON.parse(window.localStorage['user'] || '{}');
    if (user) {
      this.useCredentials(user);
    }
  }

  private useCredentials (user) {
    this.isAuthenticated = true;
    this.userSettings.settings.id_customer = user.id;
  }

  private destroyCredentials () {
    this.isAuthenticated = false;
    window.localStorage.removeItem('user');
  }
}
