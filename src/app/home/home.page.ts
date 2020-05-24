import { environment } from './../../environments/environment';
import { LoginService } from './../api/login/login.service';
import { LanguageService } from './../services/language/language.service';
import { TranslatableComponent } from './../components/translatable/translatable';
import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
// import { MenuPage } from './../menu/menu';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends TranslatableComponent {

  user: { email: string, password: string } = { email: '', password: '' };

  constructor(
    private router: Router,
    langService: LanguageService,
    private loginService: LoginService,
    private toastCtrl: ToastController) {

    super(langService);
  }

  loginEmail (user) {
    console.log("THIS USER: " + JSON.stringify(this.user));
    const validationResult = this.validateFields(user);
    if (validationResult.success) {
      this.doLoginAuth(user);
    }
    else {
      console.log('ERROR: ' + validationResult.message);
      (async () => {
        const message = 'Usuario o contraseña incorrecta';
        const toast = await this.toastCtrl.create({ message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' });
        await toast.present();
      })();
    }
  }

  loginFb () {

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
    const md5 = Md5.hashStr(`${environment.app_features.cookie_auth ? environment.COOKIE_KEY : ''}${user.password}`);
    this.loginService.login(user.email, md5).subscribe(res => {
      console.log(res);
      // @ts-ignore
      if (res.status === 200 && res.body.customers) {
        // @ts-ignore
        const user = res.body.customers[0];
        console.log(user);
        this.loginService.storeUserCredentials(user);
        console.log('local: ' + window.localStorage.user);
        this.router.navigate(['/menu']);
      }
      else {
        (async () => {
          const message = 'Usuario o contraseña incorrecta';
          const toast = await this.toastCtrl.create({ message, duration: 3000, position: 'bottom', cssClass: 'modal-warning' });
          await toast.present();
        })();
      }
    }, error => {
      (async (error) => {
        const toast = await this.toastCtrl.create({ message: error, duration: 3000, position: 'bottom', cssClass: 'modal-warning' });
        await toast.present();
      })(error);
    });
  }
}

const MAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
