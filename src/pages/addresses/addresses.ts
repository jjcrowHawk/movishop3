import { LanguageService } from './../../providers/language/language';
import { TranslatableComponent } from './../../components/translatable/translatable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Address } from '../../app/types/address';
import { AddressProvider } from '../../providers/api/address/address.service';

/**
 * Generated class for the AddressesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addresses',
  templateUrl: 'addresses.html',
})
export class AddressesPage extends TranslatableComponent {
  customerAddresses: Address[];
  isLoadingcustomerAddresses: boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    langService: LanguageService,
    private addressService: AddressProvider,
    private toastCtrl: ToastController) {

    super(langService);

    this.addressService.getAddresses().subscribe(response => {
      if (response.status == 200 && response.body) {
        // @ts-ignore
        console.log(response.body.addresses);
        // @ts-ignore
        this.customerAddresses = response.body.addresses;
        console.log(this.customerAddresses);
      }
      else {
        let message = 'No se ha podido mostrar sus direcciones, intente nuevamente';
        this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present()
      }
      this.isLoadingcustomerAddresses = false;
    }, error => {
      this.toastCtrl.create({ message: error, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present();
      this.isLoadingcustomerAddresses = false;
    })
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad AddressesPage');
  }

  addAddress () {
    this.navCtrl.push('new-address');
  }

  editAddress (index) {
    console.log(`edit element with index ${index}: ${JSON.stringify(this.customerAddresses[index])}`);
    let add = this.customerAddresses[index];
    this.navCtrl.push('new-address', { address: add });
  }

  deleteAddress (index) {
    console.log(`edit element with index ${index}: ${this.customerAddresses[index]}`);
    let add = this.customerAddresses[index];
    this.addressService.deleteAddress(add).subscribe(response => {
      if (response.status == 200 && response.body) {
        this.customerAddresses.splice(index, 1);
        let message = 'Dirección eliminada con éxito';
        this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: '' }).present()
      } else {
        let message = 'No se ha podido mostrar sus direcciones, intente nuevamente';
        this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present()
      }
    }, error => {
      this.toastCtrl.create({ message: error, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present();
    });
  }
}
