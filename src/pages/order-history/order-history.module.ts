import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderHistoryPage } from './order-history';
import { PipesModule } from './../../pipes/pipes.module';

@NgModule({
  declarations: [
    OrderHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderHistoryPage),
    PipesModule,
  ],
})
export class OrderHistoryPageModule { }
