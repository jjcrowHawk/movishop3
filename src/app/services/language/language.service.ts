import { Injectable } from '@angular/core';
import { UserSettingsService } from './../user-settings/user-settings.service';
import { LOCAL_EN, LOCAL_DE } from './../../../utils/localization';

@Injectable({
  providedIn: 'root'
})
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
