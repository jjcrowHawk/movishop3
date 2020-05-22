import { ModalOrderStatusPage } from './../modal-order-status/modal-order-status';
import { OrdersProvider } from './../../providers/api/orders/orders.service';
import { IOrder } from './../../app/types/order';
import { LanguageService } from './../../providers/language/language';
import { TranslatableComponent } from './../../components/translatable/translatable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';

/**
 * Generated class for the OrderHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage extends TranslatableComponent {

  customerOrders: IOrder[] = [];
  isLoadingOrderHistoryList: boolean = true;
  orderType: string = "inprogress";
  statesCache: { [key: string]: any } = {};


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    langService: LanguageService,
    private orderService: OrdersProvider,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController) {

    super(langService);

    this.orderService.getCustomerOrders().subscribe(response => {
      if (response.status == 200 && response.body) {
        console.log(response.body.orders);
        this.customerOrders = response.body.orders;
        console.log(this.customerOrders);
      }
      else {
        let message = 'No se ha podido mostrar sus pedidos, intente nuevamente';
        this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present()
      }
      this.isLoadingOrderHistoryList = false;
    }, error => {
      this.toastCtrl.create({ message: error, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present();
      this.isLoadingOrderHistoryList = false;
    })
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad OrderHistoryPage');
  }

  goToOrderDescription (order_id: string | number, isInProgress: boolean) {
    console.log('GOING TO ORDER ' + order_id);
    let order = this.customerOrders.find(order => order.id === order_id);
    let modal = this.modalCtrl.create(ModalOrderStatusPage, { 'order': order, 'inprogress': isInProgress });
    modal.present();
  }

}
