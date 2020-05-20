import { Directive, ViewContainerRef } from '@angular/core';

/**
 * Generated class for the MapSnapshotDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[map-snapshot-host]' // Attribute selector
})
export class MapSnapshotDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
