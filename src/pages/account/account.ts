import { EVENTS } from './../../app/types/custom-events';
import { AuthProvider } from './../../providers/api/login/login.service';
import { UserSettingsService } from './../../providers/user-settings/user-settings';
import { LanguageService } from './../../providers/language/language';
import { TranslatableComponent } from './../../components/translatable/translatable';
import { environment } from './../../enviroments/environment';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'my-account',
  segment: 'my-account'
})
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage extends TranslatableComponent {

  isAuthenticated: boolean;
  display_saved_payments: boolean;
  display_policy: boolean;
  address_tab: boolean;
  configs_enabled: boolean;
  multilanguage_support: boolean;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    langService: LanguageService,
    private settingService: UserSettingsService,
    private authService: AuthProvider,
    private events: Events) {

    super(langService);
    this.isAuthenticated = environment.app_features.auth_required && authService.isAuthenticated;
    this.display_policy = environment.app_features.usage_policy;
    this.display_saved_payments = environment.app_features.payment_methods_storage;
    this.address_tab = environment.app_features.addresses_as_tab;
    this.configs_enabled = environment.app_features.configs_enabled;
    this.multilanguage_support = environment.app_features.multi_language;
  }

  logout () {
    this.authService.logout();
    this.events.publish(EVENTS.logoutSuccess);
  }

  goToAccountInfo () {
    this.navCtrl.push('account-info');
  }

  goToAddresses () {
    this.navCtrl.push('addresses');
  }

  goToOrderHistory () {
    this.navCtrl.push('order-history');
  }

  goToSavedPaymentMethods () {

  }

  goToServiceTerms () {

  }

  goToPrivacyPolicy () {

  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad AccountPage');
  }

  showChangeLanguage () {
    console.log('Languages');
  }

  login () {
    //UNUSED METHOD
  }

}
