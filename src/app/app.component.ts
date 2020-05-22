import { AuthProvider } from './../providers/api/login/login.service';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'login';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private authService: AuthProvider) {

    if (this.authService.checkAuthenticated()) {
      this.authService.loadUserCredentials();
      this.rootPage = 'app';
    }
    else {
      this.rootPage = 'login';
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

