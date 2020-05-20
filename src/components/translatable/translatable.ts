import { LanguageService } from './../../providers/language/language';
import { Component } from '@angular/core';

/**
 * Generated class for the TranslatableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'translatable',
  templateUrl: 'translatable.html'
})
export class TranslatableComponent {

  translation: any = {};

  constructor(protected langService: LanguageService) {
    this.translation = langService.getLangDict();
  }

}
