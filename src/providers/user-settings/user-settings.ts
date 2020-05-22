import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserSettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

interface IUserSettings {
  id_guest: string,
  id_customer: string,
  id_cart: string,
  id_lang: string,
  id_currency: string,
  iso_code: string
}

@Injectable()
export class UserSettingsService {

  settings: IUserSettings;

  constructor() {
    let defaultCurrencyId = "1";
    let defaultLanguageId = "1";
    let defaultLanguageIsoCode = "en";

    this.settings = JSON.parse(window.localStorage['settings'] || '{"id_guest": "","id_customer": "","id_cart": "", "id_lang": "", "id_currency": "", "iso_code" : ""}');
    this.settings["id_lang"] = this.settings.id_lang || defaultLanguageId;
    this.settings["id_currency"] = this.settings.id_currency || defaultCurrencyId;
    this.settings["iso_code"] = this.settings.iso_code || defaultLanguageIsoCode;
  }

}
