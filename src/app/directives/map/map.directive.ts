import { Directive, ViewContainerRef } from '@angular/core';

/**
 * Generated class for the MapDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[map-host]' // Attribute selector
})
export class MapDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
