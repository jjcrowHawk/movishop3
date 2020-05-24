import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Address } from '../../types/address';
import { AddressService } from '../../api/address/address.service';
import { LanguageService } from './../../services/language/language.service';
import { TranslatableComponent } from './../../components/translatable/translatable';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage extends TranslatableComponent implements OnInit {

  customerAddresses: Address[];
  isLoadingcustomerAddresses: boolean = true;

  constructor(
    private router: Router,
    langService: LanguageService,
    private addressService: AddressService,
    private toastCtrl: ToastController) {

    super(langService);
  }

  ngOnInit () {
    console.log('ionViewDidLoad AddressesPage');

    this.addressService.getAddresses().subscribe(response => {
      if (response.status === 200 && response.body) {
        // @ts-ignore
        console.log(response.body.addresses);
        // @ts-ignore
        this.customerAddresses = response.body.addresses;
        console.log(this.customerAddresses);
      }
      else {
        const message = 'No se ha podido mostrar sus direcciones, intente nuevamente';
        (async () => {
          const toast = await this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' });
          await toast.present();
        })();
      }
      this.isLoadingcustomerAddresses = false;
    }, error => {
      (async () => {
        const toast = await this.toastCtrl.create({ message: error, duration: 3000, position: 'bottom', cssClass: 'modal-warning' });
        await toast.present();
      })();
      this.isLoadingcustomerAddresses = false;
    });
  }

  addAddress () {
    this.router.navigate(['menu/account/addresses/new-address']);
  }

  editAddress (index) {
    console.log(`edit element with index ${index}: ${JSON.stringify(this.customerAddresses[index])}`);
    const add = this.customerAddresses[index];
    this.router.navigateByUrl('menu/account/addresses/new-address', { state: { address: add } });
  }

  async deleteAddress (index) {
    console.log(`edit element with index ${index}: ${this.customerAddresses[index]}`);
    const add = this.customerAddresses[index];
    this.addressService.deleteAddress(add).subscribe(async response => {
      if (response.status === 200 && response.body) {
        this.customerAddresses.splice(index, 1);
        const message = 'Dirección eliminada con éxito';
        const toast = await this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: '' });
        await toast.present();
      } else {
        const message = 'No se ha podido mostrar sus direcciones, intente nuevamente';
        const toast = await this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' });
        await toast.present();
      }
    }, async error => {
      const toast = await this.toastCtrl.create({ message: error, duration: 3000, position: 'bottom', cssClass: 'modal-warning' });
      await toast.present();
    });
  }

}
