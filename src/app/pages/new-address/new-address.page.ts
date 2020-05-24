import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Address } from './../../types/address';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslatableComponent } from './../../components/translatable/translatable';
import { isRequiredField } from './../../../utils/form-utils';
import { GeolocationService/*, GEOLOCATION_CLASSES_MAP */ } from './../../services/geolocation/geolocation.service';
import { MapComponent, MapsEvent } from './../../components/map/imap';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { AddressService } from './../../api/address/address.service';
import { LanguageService } from './../../services/language/language.service';
import { GoogleMapComponent } from '../../components/map/google-map/google-map.component';
import { MapDirective } from './../../directives/map/map.directive';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.page.html',
  styleUrls: ['./new-address.page.scss'],
})
export class NewAddressPage extends TranslatableComponent implements OnInit {

  addressData: Address;
  addressForm: FormGroup;
  required_fields: { [key: string]: boolean };
  states: any[];
  cities: any[];
  geocodingReady: boolean;
  @ViewChild(MapDirective) mapHost: MapDirective;

  constructor(
    langService: LanguageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private toastCtrl: ToastController,
    private geolocationService: GeolocationService,
    // private nativeGeocoder: NativeGeocoder,
    private componentFactoryResolver: ComponentFactoryResolver) {

    super(langService);

    this.addressData = this.router.getCurrentNavigation().extras.state?.address || null;
    this.addressForm = this.setupForm();
    this.required_fields = this.setUpRequiredFields();


    if (this.addressData != null) {
      this.addressForm.patchValue(this.addressData);
    }
  }

  ngOnInit () {
    console.log('ionViewDidLoad NewAddressPage');
    this.addressService.getStates().subscribe(states => {
      this.states = states;
      if (this.addressData && this.addressData.id_state && this.addressData.id_city) {
        this.addressForm.patchValue({ state: this.addressData.id_state });
        this.stateChanged(this.addressData.id_state);
      }
    });
    this.loadMap();
  }

  async updateCustomer () {
    console.log('SUBMIT: ' + JSON.stringify(this.addressForm.value));
    this.addressService.editAddress(this.addressForm.value).subscribe(async response => {
      if (response.status == 200 && response.body) {
        const message = 'Proceso realizado con éxito';
        const toast = await this.toastCtrl.create({ message, duration: 3000, position: 'bottom', cssClass: '' });
        await toast.present();
      }
      else {
        const message = 'No se ha podido realizar la acción, intente más tarde';
        const toast = await this.toastCtrl.create({ message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' });
        await toast.present();
      }
    }, async error => {
      const toast = await this.toastCtrl.create({ message: error, duration: 3000, position: 'bottom', cssClass: 'modal-warning' });
      await toast.present();
    });
  }

  async stateChanged ($event) {
    const id = this.addressForm.controls['state'].value
    this.addressForm.patchValue({ city: '' });
    console.log('This event:' + JSON.stringify(id));
    this.addressService.getCities(id).subscribe(cities => {
      console.log('cities: ' + JSON.stringify(cities));
      this.cities = cities.filter(city => city.intCodigoProvinciaInen === id);
      if (this.addressData && this.addressData.id_city) {
        this.addressForm.patchValue({ city: this.addressData.id_city });
      }
    });
  }

  private setupForm (): FormGroup {
    return this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required, Validators.pattern(RegExp(/^[A-Za-z\s]+$/))])],
      lastname: ['', Validators.compose([Validators.required, Validators.pattern(RegExp(/^[a-zA-Z\s]+$/))])],
      // company: ['',],
      address1: ['', Validators.required],
      address2: ['',],
      // postcode: ['', Validators.pattern(/^[a-zA-Z0-9]+$/)],
      city: ['', Validators.required],
      state: ['', Validators.required],
      phone_mobile: ['', Validators.compose([Validators.required, Validators.pattern(RegExp(/^([0-9]{10}|\+[0-9]{10,12})$/))])],
      // phone: ['', Validators.pattern(/^([0-9]{7,10}|\+[0-9]{7,12})$/)],
      other: [''],
      alias: ['', Validators.required],
      lat: [''],
      lng: [''],
    });

  }

  setUpRequiredFields (): { [key: string]: boolean } {
    const reqFields = {};

    for (const control in this.addressForm.controls) {
      reqFields[control] = isRequiredField(this.addressForm.controls[control]);
    }
    console.log(reqFields);
    return reqFields;
  }

  async loadMap () {

    if (this.addressData && this.addressData.lat && this.addressData.lng) {
      const location = { lat: this.addressData.lat, lng: this.addressData.lng };

      /*this.nativeGeocoder.reverseGeocode(location.lat, location.lng)
        .then((result: NativeGeocoderReverseResult[]) => console.log(JSON.stringify(result[0])))
        .catch((error: any) => console.error(error))*/

      this.setUpMap(location);
    }
    else {
      this.geolocationService.getLocation().then(location => {
        console.log('THIS LOC: ' + JSON.stringify(location));
        this.addressForm.patchValue({
          lat: location.lat,
          lng: location.lng,
        });
        /*this.nativeGeocoder.reverseGeocode(location.lat, location.lng)
          .then((result: NativeGeocoderReverseResult[]) => console.log(JSON.stringify(result[0])))
          .catch((error: any) => console.error(error))*/
        this.setUpMap(location);
      }).catch(async error => {
        console.log('LOCATION ERROR:' + error);
        const message = 'No se ha podido obtener su ubicación, intente de nuevo';
        const toast = await this.toastCtrl.create({ message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' });
        await toast.present();
      });
    }
  }

  private async setUpMap (coordinates) {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(GoogleMapComponent);
    const viewContainerRef = this.mapHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    const map = componentRef.instance as MapComponent;
    map.id = 'address_form_map';
    map.location = coordinates;

    await map.createMap();

    this.geolocationService.getAddressFromLocation(coordinates).then(address => {
      if (address) {
        this.addressForm.patchValue({
          address1: address
        });
      }
    });

    const marker = await map.addMarker(coordinates, 'my_location_marker');

    map.subscribeMapEvent(MapsEvent.GOOGLEMAPS.CAMERA_MOVE).subscribe(result => {
      // console.log("CAMERA_MOVE: " + JSON.stringify(result));
      if (result[0].target) {
        const cameraCoords = result[0].target;
        map.changeMarkerLocation(marker, cameraCoords);
        this.addressForm.patchValue({
          lat: cameraCoords.lat,
          lng: cameraCoords.lng,
        });
      }
    });

    map.subscribeMapEvent(MapsEvent.GOOGLEMAPS.CAMERA_MOVE_END).subscribe((params: any[]) => {
      console.log('CAMERA MOVE END: ' + JSON.stringify(params));
      if (params[0].target) {
        const cameraCoords = params[0].target;
        map.changeMarkerLocation(marker, cameraCoords);
        this.addressForm.patchValue({
          lat: cameraCoords.lat,
          lng: cameraCoords.lng,
        });
        this.geolocationService.getAddressFromLocation(cameraCoords).then(address => {
          if (address) {
            this.addressForm.patchValue({
              address1: address
            });
          }
        });
      }
    });
  }

}
