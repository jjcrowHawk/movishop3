import { Component, OnInit } from '@angular/core';
import { AccountInfoService } from './../../api/account-info/account-info.service';
import { Customer } from './../../types/customer';
import { TranslatableComponent } from './../../components/translatable/translatable';
import { LanguageService } from './../../services/language/language.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.page.html',
  styleUrls: ['./account-info.page.scss'],
})
export class AccountInfoPage extends TranslatableComponent implements OnInit {

  user: Customer;
  new_password: string = '';
  confirm_password: string = '';

  constructor(langService: LanguageService, private accountInfoservice: AccountInfoService, private toastCtrl: ToastController) {
    super(langService);
    this.user = { id: null, secure_key: null };

    this.accountInfoservice.getUserInfo().subscribe(response => {
      console.log(response);
      // @ts-ignore
      this.user = response.body.customers[0];
      console.log(this.user);
    }, error => {
      (async () => {
        const toast = await this.toastCtrl.create({ cssClass: 'modal-warning', message: error, duration: 3500, position: 'bottom' });
        await toast.present();
      })();
      console.log(error);
    })
  }

  ngOnInit () {
    console.log('ionViewDidLoad AccountInfoPage');
  }

  updateCustomer () {
    this.accountInfoservice.updateCustomer(this.user).subscribe(response => {
      if (response.status === 200 && response.body && response.body.success) {
        const message = 'Se ha actualizado su información exitosamente';
        (async () => {
          const toast = await this.toastCtrl.create({ message: message, duration: 5000, position: 'bottom' });
          await toast.present();
        })();
      }
      else {
        const message = 'No se ha podido actualizar su información, intente nuevamente';
        (async () => {
          const toast = await this.toastCtrl.create({ message: message, duration: 5000, position: 'bottom', cssClass: 'modal-warning' });
          await toast.present();
        })();
      }
    }, error => {
      (async () => {
        const toast = await this.toastCtrl.create({ cssClass: 'modal-warning', message: error, duration: 3500, position: 'bottom' });
        await toast.present();
      })();
    })
  }

  updatePassword () {
    this.accountInfoservice.updatePassword(this.user.passwd, this.new_password).subscribe(response => {
      if (response.status === 200 && response.body && response.body.success) {
        let message = 'Se ha actualizado su contraseña exitosamente';
        (async () => {
          const toast = await this.toastCtrl.create({ message: message, duration: 5000, position: 'bottom' });
          await toast.present();
        })();
      }
      else {
        let message = 'No se ha podido actualizar su contraseña, intente nuevamente';
        (async () => {
          const toast = await this.toastCtrl.create({ message: message, duration: 5000, position: 'bottom', cssClass: 'modal-warning' });
          await toast.present();
        })();
      }
    }, error => {
      (async () => {
        const toast = await this.toastCtrl.create({ cssClass: 'modal-warning', message: error, duration: 3500, position: 'bottom' });
        await toast.present();
      })();
    })
  }

}
