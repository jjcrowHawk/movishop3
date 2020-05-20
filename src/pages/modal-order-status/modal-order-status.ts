import { Coordinates } from './../../app/types/coordinates';
import { GooglemapsSnapshotComponent } from './../../components/map-snapshot/googlemaps-snapshot/googlemaps-snapshot.component';
import { MapSnapshotDirective } from './../../directives/map-snapshot/map-snapshot.directive';
import { OrdersProvider } from './../../providers/api/orders/orders.service';
import { IOrder } from './../../app/types/order';
import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, ViewController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'
import { MapSnapshotComponent } from 'components/map-snapshot/map-snapshot';
import { Address } from './../../app/types/address';

/**
 * Generated class for the ModalOrderStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-order-status',
  templateUrl: 'modal-order-status.html',
})
export class ModalOrderStatusPage {

  order: IOrder = null
  orderInProgress: boolean;
  orderAddressDelivery: Address;
  orderInvoice: any;
  orderInvoiceAddress: Address;
  @ViewChild(MapSnapshotDirective) mapSnapshotHost: MapSnapshotDirective

  constructor(public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private ordersService: OrdersProvider,
    private geolocation: Geolocation,
    private componentFactoryResolver: ComponentFactoryResolver,
    private toastCtrl: ToastController) {

    this.order = this.params.get('order');
    this.orderInProgress = this.params.get('inprogress');
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad ModalOrderStatusPage');
    this.ordersService.getOrderDeliveryAddress(this.order.id_address_delivery).subscribe(response => {
      if (response.status === 200 && response.body) {
        this.orderAddressDelivery = response.body.addresses[0];
        this.loadOrderLocationSnapshot(new Coordinates(this.orderAddressDelivery.lat, this.orderAddressDelivery.lng));
      }
      else {
        let message = 'No se pueden cargar datos de dirección';
        this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present();
      }
    }, error => {
      this.toastCtrl.create({ message: error, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present();
    });

    this.ordersService.getOrderInvoiceAddress(this.order.id_address_invoice).subscribe(response => {
      if (response.status === 200 && response.body) {
        this.orderInvoiceAddress = response.body.addresses[0];
        this.loadOrderLocationSnapshot(new Coordinates(this.orderAddressDelivery.lat, this.orderAddressDelivery.lng));
      }
      else {
        let message = 'No se pueden cargar algunos datos de facturación';
        this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present();
      }
    }, error => {
      this.toastCtrl.create({ message: error, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present();
    });


  }

  dismiss () {
    this.viewCtrl.dismiss();
  }

  loadOrderLocationSnapshot (coords: Coordinates) {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
      let coords = new Coordinates(resp.coords.latitude, resp.coords.longitude);
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(GooglemapsSnapshotComponent);
      let viewContainerRef = this.mapSnapshotHost.viewContainerRef;
      viewContainerRef.clear();

      let componentRef = viewContainerRef.createComponent(componentFactory);
      let mapSnap = <MapSnapshotComponent>componentRef.instance;
      mapSnap.location = coords;
      mapSnap.renderSnapshot();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getTax () {
    return parseFloat('' + this.order.total_paid_tax_incl) - parseFloat('' + this.order.total_paid_tax_excl);
  }

}
