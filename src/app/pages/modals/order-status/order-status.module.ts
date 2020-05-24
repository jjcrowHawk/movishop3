import { DirectivesModule } from './../../../directives/directives.module';
import { ComponentsModule } from './../../../components/components.module';
import { PipesModule } from './../../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderStatusPageRoutingModule } from './order-status-routing.module';

import { ModalOrderStatusPage } from './order-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderStatusPageRoutingModule,
    ComponentsModule,
    PipesModule,
    DirectivesModule
  ],
  declarations: [ModalOrderStatusPage]
})
export class OrderStatusPageModule { }
