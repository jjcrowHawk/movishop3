import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { MapSnapshotDirective } from './../directives/map-snapshot/map-snapshot.directive';
import { GooglemapsSnapshotComponent } from './../components/map-snapshot/googlemaps-snapshot/googlemaps-snapshot.component';
import { MapDirective } from './../directives/map/map.directive';
import { GoogleMapComponent } from './../components/map/google-map/google-map.component';
import { GeolocationFactory } from './../factories/geolocation-factory';
import { environment } from './../enviroments/environment';
import { GoogleGeolocationProvider } from './../providers/geolocation/google-geolocation/google-geolocation';
import { ModalOrderStatusPage } from './../pages/modal-order-status/modal-order-status';
import { PipesModule } from './../pipes/pipes.module';
import { NewAddressPage } from './../pages/new-address/new-address';
import { OrderHistoryPage } from './../pages/order-history/order-history';
import { AddressesPage } from './../pages/addresses/addresses';
import { AccountInfoPage } from './../pages/account-info/account-info';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LanguageService } from './../providers/language/language';
import { AccountPage } from './../pages/account/account';
import { CartPage } from './../pages/cart/cart';
import { CategoriesPage } from './../pages/categories/categories';
import { SearchPage } from './../pages/search/search';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from './../pages/menu/menu';
import { UserSettingsService } from '../providers/user-settings/user-settings';
import { AuthProvider } from '../providers/api/login/login.service';
import { AccountInfoProvider } from '../providers/api/account-info/account-info';
import { AddressProvider } from '../providers/api/address/address.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrdersProvider } from '../providers/api/orders/orders.service';
import { OpenStreetGeolocationProvider } from '../providers/geolocation/openstreet-geolocation/openstreet-geolocation';
import { GeolocationProvider } from './../providers/geolocation/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    SearchPage,
    CategoriesPage,
    CartPage,
    AccountPage,
    AccountInfoPage,
    AddressesPage,
    NewAddressPage,
    OrderHistoryPage,
    ModalOrderStatusPage,
    MapDirective,
    GoogleMapComponent,
    MapSnapshotDirective,
    GooglemapsSnapshotComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: MenuPage, name: 'app', segment: 'app' },
        { component: HomePage, name: 'login', segment: 'login' },
        { component: SearchPage, name: 'search', segment: 'search' },
        { component: CategoriesPage, name: 'categories', segment: 'categories' },
        { component: CartPage, name: 'shopping-cart', segment: 'shopping-cart' },
        { component: AccountPage, name: 'my-account', segment: 'my-account' },
        { component: AccountInfoPage, name: 'account-info', segment: 'my-account/account-info' },
        { component: AddressesPage, name: 'addresses', segment: 'my-account/addresses' },
        { component: NewAddressPage, name: 'new-address', segment: 'my-account/addresses/create' },
        { component: OrderHistoryPage, name: 'order-history', segment: 'my-account/order-history' }
      ]
    }),
    PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    SearchPage,
    CategoriesPage,
    CartPage,
    AccountPage,
    AccountInfoPage,
    AddressesPage,
    NewAddressPage,
    OrderHistoryPage,
    ModalOrderStatusPage,
    GoogleMapComponent,
    GooglemapsSnapshotComponent
  ],
  providers: [
    UserSettingsService,
    LanguageService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    AccountInfoProvider,
    AddressProvider,
    OrdersProvider,
    { provide: GeolocationProvider, useFactory: (http: HttpClient) => GeolocationFactory(http), deps: [HttpClient] },
    Geolocation,
    NativeGeocoder,
  ],
})
export class AppModule { }
