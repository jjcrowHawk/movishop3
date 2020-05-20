import { UserSettingsService } from './../user-settings/user-settings';
import { LOCAL_EN, LOCAL_DE } from '../../utils/localization';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LanguageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LanguageService {

  translation: any = {};

  constructor(private userSettings: UserSettingsService) {
    this.translation['en'] = LOCAL_EN;
    this.translation['de'] = LOCAL_DE;
  }

  getLangDict () {
    return this.translation[this.userSettings.settings.iso_code];
  }

}
