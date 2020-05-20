import { NgModule } from '@angular/core';
import { MapDirective } from './map/map.directive';
import { MapSnapshotDirective } from './map-snapshot/map-snapshot.directive';
@NgModule({
	declarations: [MapDirective,
		MapSnapshotDirective],
	imports: [],
	exports: [MapDirective,
		MapSnapshotDirective]
})
export class DirectivesModule { }
