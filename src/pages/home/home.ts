import { environment } from './../../enviroments/environment.prod';
import { AuthProvider } from './../../providers/api/login/login.service';
import { LanguageService } from './../../providers/language/language';
import { TranslatableComponent } from './../../components/translatable/translatable';
import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController } from 'ionic-angular';
import { MenuPage } from './../menu/menu';
import { Md5 } from './../../../node_modules/ts-md5/dist/md5'

@IonicPage({
  name: 'login',
  segment: 'login'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage extends TranslatableComponent {
  user: { email: string, password: string }

  constructor(public navCtrl: NavController,
    langService: LanguageService,
    private loginService: AuthProvider,
    private toastCtrl: ToastController) {
    super(langService);
    this.user = { email: '', password: '' };
  }

  loginEmail (user) {
    let validationResult = this.validateFields(user);
    if (validationResult.success) {
      this.doLoginAuth(user);
    }
    else {
      console.log('ERROR: ' + validationResult.message);
    }
  }

  private validateFields (user) {
    let message;
    if (user.email.trim().length == 0) {
      message = 'El usuario no debe estar vacío';
    }
    else if (!user.email.match(MAIL_REGEX)) {
      message = 'El mail ingresado no es válido';
    }
    else if (user.password.trim().length == 0) {
      message = 'La contraseña no debe estar vacía';
    }
    return { success: !message, message };
  }

  private doLoginAuth (user) {
    let md5 = Md5.hashStr(`${environment.app_features.cookie_auth ? environment.COOKIE_KEY : ''}${user.password}`);
    this.loginService.login(user.email, md5).subscribe(res => {
      console.log(res)
      // @ts-ignore
      if (res.status === 200 && res.body.customers) {
        // @ts-ignore
        let user = res.body.customers[0];
        console.log(user);
        this.loginService.storeUserCredentials(user);
        console.log('local: ' + window.localStorage['user']);
        this.navCtrl.push(MenuPage);
      }
      else {
        let message = 'Usuario o contraseña incorrecta';
        this.toastCtrl.create({ message: message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present()
      }
    }, error => {
      console.log('this error: ' + error);
      this.toastCtrl.create({ message: error, duration: 3000, position: 'bottom', cssClass: 'modal-warning' }).present()
    });
  }

}

const MAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
