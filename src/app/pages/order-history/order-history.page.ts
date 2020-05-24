import { Component, OnInit } from '@angular/core';
import { ModalOrderStatusPage } from './../modals/order-status/order-status.page';
import { OrdersService } from './../../api/orders/orders.service';
import { IOrder } from './../../types/order';
import { LanguageService } from './../../services/language/language.service';
import { TranslatableComponent } from './../../components/translatable/translatable';
import { Router } from '@angular/router';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage extends TranslatableComponent implements OnInit {

  customerOrders: IOrder[] = [];
  isLoadingOrderHistoryList: boolean = true;
  orderType: string = "inprogress";
  statesCache: { [key: string]: any } = {};


  constructor(
    private router: Router,
    langService: LanguageService,
    private orderService: OrdersService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController) {

    super(langService);

  }

  ngOnInit () {
    console.log('ionViewDidLoad OrderHistoryPage');

    this.orderService.getCustomerOrders().subscribe(async response => {
      if (response.status === 200 && response.body) {
        console.log(response.body.orders);
        this.customerOrders = response.body.orders;
        console.log(this.customerOrders);
      }
      else {
        const message = 'No se ha podido mostrar sus pedidos, intente nuevamente';
        (async () => {
          const toast = await this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' });
          await toast.present();
        })();
      }
      this.isLoadingOrderHistoryList = false;
    }, async error => {
      const toast = await this.toastCtrl.create({ message: error, duration: 3000, position: 'bottom', cssClass: 'modal-warning' });
      await toast.present();
      this.isLoadingOrderHistoryList = false;
    })
  }

  async goToOrderDescription (order_id: string | number, isInProgress: boolean) {
    console.log('GOING TO ORDER ' + order_id);
    const order = this.customerOrders.find(order => order.id === order_id);
    const modal = await this.modalCtrl.create({
      component: ModalOrderStatusPage,
      componentProps: { 'order': order, 'inprogress': isInProgress }
    });
    return await modal.present();
  }

}
