import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { TranslatableComponent } from './translatable/translatable';
import { GoogleMapComponent } from './map/google-map/google-map.component';
import { CommonModule } from '@angular/common';
import { GooglemapsSnapshotComponent } from './map-snapshot/googlemaps-snapshot/googlemaps-snapshot.component';
@NgModule({
	declarations: [
		TranslatableComponent,
		GoogleMapComponent,
		GooglemapsSnapshotComponent,
	],
	imports: [CommonModule, IonicModule],
	exports: [
		TranslatableComponent,
		GoogleMapComponent,
		GooglemapsSnapshotComponent,
	]
})
export class ComponentsModule { }
