import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalOrderStatusPage } from './order-status.page';

const routes: Routes = [
  {
    path: '',
    component: ModalOrderStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderStatusPageRoutingModule { }
