import { AccountInfoProvider } from './../../providers/api/account-info/account-info';
import { Customer } from './../../app/types/customer';
import { TranslatableComponent } from './../../components/translatable/translatable';
import { LanguageService } from './../../providers/language/language';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the AccountInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-info',
  templateUrl: 'account-info.html',
})
export class AccountInfoPage extends TranslatableComponent {
  user: Customer;
  new_password: string = '';
  confirm_password: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, langService: LanguageService, private accountInfoservice: AccountInfoProvider, private toastCtrl: ToastController) {
    super(langService);
    this.user = { id: null, secure_key: null };

    this.accountInfoservice.getUserInfo().subscribe(response => {
      console.log(response);
      // @ts-ignore
      this.user = response.body.customers[0];
      console.log(this.user);
    }, error => {
      toastCtrl.create({ cssClass: 'modal-warning', message: error, duration: 3500, position: 'bottom' }).present();
      console.log(error);
    })
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad AccountInfoPage');
  }

  updateCustomer () {
    this.accountInfoservice.updateCustomer(this.user).subscribe(response => {
      if (response.status === 200 && response.body && response.body.success) {
        let message = 'Se ha actualizado su información exitosamente';
        this.toastCtrl.create({ message: message, duration: 5000, position: 'bottom' }).present()
      }
      else {
        let message = 'No se ha podido actualizar su información, intente nuevamente';
        this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present()
      }
    }, error => {

    })
  }

  updatePassword () {
    this.accountInfoservice.updatePassword(this.user.passwd, this.new_password).subscribe(response => {
      if (response.status === 200 && response.body && response.body.success) {
        let message = 'Se ha actualizado su contraseña exitosamente';
        this.toastCtrl.create({ message: message, duration: 5000, position: 'bottom' }).present()
      }
      else {
        let message = 'No se ha podido actualizar su contraseña, intente nuevamente';
        this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present()
      }
    }, error => {

    })
  }

}
