import { GoogleMapComponent } from '../../components/map/google-map/google-map.component';
import { MapDirective } from './../../directives/map/map.directive';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  LatLng,
} from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { AddressProvider } from './../../providers/api/address/address.service';
import { LanguageService } from './../../providers/language/language';
import { Component, Injector, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { Address } from 'app/types/address';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { TranslatableComponent } from './../../components/translatable/translatable';
import { isRequiredField } from '../../utils/form-utils'
import { GeolocationProvider/*, GEOLOCATION_CLASSES_MAP */ } from './../../providers/geolocation/geolocation.service';
import { MapComponent, MapsEvent } from './../../components/map/imap';

/**
 * Generated class for the NewAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-address',
  templateUrl: 'new-address.html',
})
export class NewAddressPage extends TranslatableComponent {

  addressData: Address
  addressForm: FormGroup;
  required_fields: { [key: string]: boolean };
  states: any[];
  cities: any[];
  map: GoogleMap;
  marker: Marker;
  geocodingReady: boolean;
  @ViewChild(MapDirective) mapHost: MapDirective;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    langService: LanguageService,
    private formBuilder: FormBuilder,
    private addressService: AddressProvider,
    private toastCtrl: ToastController,
    private geolocationService: GeolocationProvider,
    //private nativeGeocoder: NativeGeocoder,
    private componentFactoryResolver: ComponentFactoryResolver) {

    super(langService);

    this.addressData = this.navParams.get('address') || null;
    this.addressForm = this.setupForm();
    this.required_fields = this.setUpRequiredFields();


    if (this.addressData != null)
      this.addressForm.patchValue(this.addressData);

    this.addressService.getStates().subscribe(states => {
      this.states = states;
      if (this.addressData && this.addressData.id_state && this.addressData.id_city) {
        this.addressForm.patchValue({ state: this.addressData.id_state })
        this.stateChanged(this.addressData.id_state);
      }
    })
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad NewAddressPage');
    this.loadMap();
  }

  updateCustomer () {
    console.log("SUBMIT: " + JSON.stringify(this.addressForm.value));
    this.addressService.editAddress(this.addressForm.value).subscribe(response => {
      if (response.status == 200 && response.body) {
        let message = 'Proceso realizado con éxito';
        this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: '' }).present()
      }
      else {
        let message = 'No se ha podido realizar la acción, intente más tarde';
        this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present()
      }
    }, error => {
      this.toastCtrl.create({ message: error, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present();
    })
  }

  stateChanged (id) {
    console.log("This event:" + id);
    this.addressService.getCities(id).subscribe(cities => {
      console.log("cities: " + JSON.stringify(cities));
      this.cities = cities.filter(city => city.intCodigoProvinciaInen === id);
      if (this.addressData && this.addressData.id_city) {
        this.addressForm.patchValue({ city: this.addressData.id_city })
      }
    })
  }

  private setupForm (): FormGroup {
    return this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required, Validators.pattern(RegExp(/^[A-Za-z\s]+$/))])],
      lastname: ['', Validators.compose([Validators.required, Validators.pattern(RegExp(/^[a-zA-Z\s]+$/))])],
      //company: ['',],
      address1: ['', Validators.required],
      address2: ['',],
      //postcode: ['', Validators.pattern(/^[a-zA-Z0-9]+$/)],
      city: ['', Validators.required],
      state: ['', Validators.required],
      phone_mobile: ['', Validators.compose([Validators.required, Validators.pattern(RegExp(/^([0-9]{10}|\+[0-9]{10,12})$/))])],
      //phone: ['', Validators.pattern(/^([0-9]{7,10}|\+[0-9]{7,12})$/)],
      other: [''],
      alias: ['', Validators.required],
      lat: [''],
      lng: [''],
    })

  }

  setUpRequiredFields (): { [key: string]: boolean } {
    let reqFields = {}

    for (let control in this.addressForm.controls) {
      reqFields[control] = isRequiredField(this.addressForm.controls[control]);
    }
    console.log(reqFields)
    return reqFields
  }

  async loadMap () {

    if (this.addressData && this.addressData.lat && this.addressData.lng) {
      let location = { lat: this.addressData.lat, lng: this.addressData.lng }

      /*this.nativeGeocoder.reverseGeocode(location.lat, location.lng)
        .then((result: NativeGeocoderReverseResult[]) => console.log(JSON.stringify(result[0])))
        .catch((error: any) => console.error(error))*/

      this.setUpMap(location);
    }
    else {
      this.geolocationService.getLocation().then(location => {
        console.log("THIS LOC: " + JSON.stringify(location));
        this.addressForm.patchValue({
          lat: location.lat,
          lng: location.lng,
        })
        /*this.nativeGeocoder.reverseGeocode(location.lat, location.lng)
          .then((result: NativeGeocoderReverseResult[]) => console.log(JSON.stringify(result[0])))
          .catch((error: any) => console.error(error))*/
        this.setUpMap(location);
      }).catch(error => {
        console.log('LOCATION ERROR:' + error);
        let message = 'No se ha podido obtener su ubicación, intente de nuevo';
        this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present()
      })
    }
  }

  private async setUpMap (coordinates) {

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(GoogleMapComponent);
    let viewContainerRef = this.mapHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    let map = <MapComponent>componentRef.instance;
    map.id = "address_form_map";
    map.location = coordinates;

    await map.createMap();

    let marker = await map.addMarker(coordinates, "my_location_marker");

    map.subscribeMapEvent(MapsEvent['GOOGLEMAPS'].CAMERA_MOVE).subscribe(result => {
      //console.log("CAMERA_MOVE: " + JSON.stringify(result));
      if (result[0].target) {
        let cameraCoords = result[0].target
        map.changeMarkerLocation(marker, cameraCoords);
        this.addressForm.patchValue({
          lat: cameraCoords.lat,
          lng: cameraCoords.lng,
        })
      }
    });

    map.subscribeMapEvent(MapsEvent['GOOGLEMAPS'].CAMERA_MOVE_END).subscribe((params: any[]) => {
      console.log('CAMERA MOVE END: ' + JSON.stringify(params));
      if (params[0].target) {
        let cameraCoords = params[0].target
        map.changeMarkerLocation(marker, cameraCoords);
        this.addressForm.patchValue({
          lat: cameraCoords.lat,
          lng: cameraCoords.lng,
        })
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