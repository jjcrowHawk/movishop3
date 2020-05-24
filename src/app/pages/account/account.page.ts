import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from 'src/app/components/translatable/translatable';
import { LoginService } from './../../api/login/login.service';
import { UserSettingsService } from './../../services/user-settings/user-settings.service';
import { LanguageService } from './../../services/language/language.service';
import { environment } from './../../../environments/environment';
import { Events } from './../../services/events/events.service';
import { EVENTS } from './../../types/custom-events';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage extends TranslatableComponent implements OnInit {

  isAuthenticated: boolean;
  display_saved_payments: boolean;
  display_policy: boolean;
  address_tab: boolean;
  configs_enabled: boolean;
  multilanguage_support: boolean;


  constructor(
    private router: Router,
    langService: LanguageService,
    private settingService: UserSettingsService,
    private authService: LoginService,
    private events: Events) {

    super(langService);

    console.log("THIS AUTH: " + authService.isAuthenticated);
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
    this.router.navigate(['menu/account/account-info']);
    //this.navCtrl.push('account-info');
  }

  goToAddresses () {
    this.router.navigate(['menu/account/addresses']);
    //this.navCtrl.push('addresses');
  }

  goToOrderHistory () {
    this.router.navigate(['menu/account/order-history']);
    //this.navCtrl.push('order-history');
  }

  goToSavedPaymentMethods () {

  }

  goToServiceTerms () {

  }

  goToPrivacyPolicy () {

  }

  ngOnInit () {
    console.log('ionViewDidLoad AccountPage');
  }

  showChangeLanguage () {
    console.log('Languages');
  }

  login () {
    //UNUSED METHOD
  }

}
