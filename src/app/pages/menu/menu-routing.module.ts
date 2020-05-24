import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
  },
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'search',
        loadChildren: () => import('./../search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./../categories/categories.module').then(m => m.CategoriesPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./../cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('./../account/account.module').then(m => m.AccountPageModule),
          },
          {
            path: 'account-info',
            loadChildren: () => import('./../account-info/account-info.module').then(m => m.AccountInfoPageModule)
          },
          {
            path: 'addresses',
            loadChildren: () => import('./../addresses/addresses.module').then(m => m.AddressesPageModule)
          },
          {
            path: 'addresses/new-address',
            loadChildren: () => import('./../new-address/new-address.module').then(m => m.NewAddressPageModule)
          },
          {
            path: 'order-history',
            loadChildren: () => import('./../order-history/order-history.module').then(m => m.OrderHistoryPageModule)
          },
        ]
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule { }
