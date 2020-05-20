import { EVENTS } from './../../app/types/custom-events';
import { TranslatableComponent } from './../../components/translatable/translatable';
import { LanguageService } from './../../providers/language/language';
import { AccountPage } from './../account/account';
import { CategoriesPage } from './../categories/categories';
import { CartPage } from './../cart/cart';
import { SearchPage } from './../search/search';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'menu',
  segment: 'app'
})
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage extends TranslatableComponent {

  searchRoot: any = 'search' //SearchPage;
  categoriesRoot: any = 'categories' //CategoriesPage;
  cartRoot: any = 'shopping-cart' //CartPage;
  accountRoot: any = 'my-account' //AccountPage;
  //translation: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, langService: LanguageService, private events: Events) {
    super(langService);

    events.subscribe(EVENTS.logoutSuccess, event => {
      console.log('EVENT LOGOUT CATCHED, LOGOUT');
      this.navCtrl.popToRoot();
      events.unsubscribe(EVENTS.logoutSuccess);
    });
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad MenuPage');
  }

}
