import { environment } from './../../../environments/environment';
import { UserSettingsService } from './../../services/user-settings/user-settings.service';
import { Customer } from './../../../app/types/customer';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isAuthenticated = false;

  constructor(public http: HttpClient, private userSettings: UserSettingsService) {
    console.log('Hello LoginProvider Provider');
  }

  login (email, password): Observable<HttpResponse<Customer>> {
    return this.http
      .get<Customer>(environment.api.customers,
        {
          params: { 'filter[email]': email, 'filter[passwd]': password, 'filter[active]': '1', 'filter[deleted]': '0', output_format: 'JSON', ws_key: environment.ws_key, display: '[id,secure_key]' },
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
            message = 'Algo salió mal, intente más tarde';
          }

          return throwError(message);
        })
      );

  }

  logout () {
    this.destroyCredentials();
  }

  checkAuthenticated () {
    const credentials = JSON.parse(window.localStorage.getItem('user') || '{}');
    if (credentials.id) {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }

  storeUserCredentials (user) {
    window.localStorage.user = JSON.stringify(user);
    this.useCredentials(user);
  }

  loadUserCredentials () {
    const user = JSON.parse(window.localStorage.user || '{}');
    if (user) {
      this.useCredentials(user);
    }
  }

  private useCredentials (user) {
    this.isAuthenticated = true;
    this.userSettings.settings.id_customer = user.id;
    console.log('is auth: ' + this.isAuthenticated);
  }

  private destroyCredentials () {
    this.isAuthenticated = false;
    window.localStorage.removeItem('user');
  }
}
