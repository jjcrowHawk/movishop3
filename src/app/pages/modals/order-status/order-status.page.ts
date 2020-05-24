import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input } from '@angular/core';
import { Platform, ToastController, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapSnapshotComponent } from './../../../components/map-snapshot/map-snapshot';
import { Address } from './../../../types/address';
import { Coordinates } from './../../../types/coordinates';
import { GooglemapsSnapshotComponent } from './../../../components/map-snapshot/googlemaps-snapshot/googlemaps-snapshot.component';
import { MapSnapshotDirective } from './../../../directives/map-snapshot/map-snapshot.directive';
import { OrdersService } from './../../../api/orders/orders.service';
import { IOrder } from './../../../types/order';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.page.html',
  styleUrls: ['./order-status.page.scss'],
})
export class ModalOrderStatusPage implements OnInit {

  @Input() order: IOrder;
  @Input() orderInProgress: boolean;
  orderAddressDelivery: Address;
  orderInvoice: any;
  orderInvoiceAddress: Address;
  @ViewChild(MapSnapshotDirective) mapSnapshotHost: MapSnapshotDirective;

  constructor(
    public platform: Platform,
    public modalController: ModalController,
    private ordersService: OrdersService,
    private geolocation: Geolocation,
    private componentFactoryResolver: ComponentFactoryResolver,
    private toastCtrl: ToastController) {

    //this.order = this.params.get('order');
    //this.orderInProgress = this.params.get('inprogress');
  }

  ngOnInit () {
    console.log('ionViewDidLoad ModalOrderStatusPage');
    this.ordersService.getOrderDeliveryAddress(this.order.id_address_delivery).subscribe(async response => {
      if (response.status === 200 && response.body) {
        this.orderAddressDelivery = response.body.addresses[0];
        this.loadOrderLocationSnapshot(new Coordinates(this.orderAddressDelivery.lat, this.orderAddressDelivery.lng));
      }
      else {
        const message = 'No se pueden cargar datos de dirección';
        const toast = await this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' });
        await toast.present();
      }
    }, async error => {
      const toast = await this.toastCtrl.create({ message: error, duration: 3000, position: 'bottom', cssClass: 'modal-warning' });
      await toast.present();
    });

    this.ordersService.getOrderInvoiceAddress(this.order.id_address_invoice).subscribe(async response => {
      if (response.status === 200 && response.body) {
        this.orderInvoiceAddress = response.body.addresses[0];
        this.loadOrderLocationSnapshot(new Coordinates(this.orderAddressDelivery.lat, this.orderAddressDelivery.lng));
      }
      else {
        const message = 'No se pueden cargar algunos datos de facturación';
        const toast = await this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' });
        await toast.present();
      }
    }, async error => {
      const toast = await this.toastCtrl.create({ message: error, duration: 3000, position: 'bottom', cssClass: 'modal-warning' });
      await toast.present();
    });


  }

  dismiss () {
    this.modalController.dismiss();
  }

  async loadOrderLocationSnapshot (coords: Coordinates) {
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
