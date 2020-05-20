import { NgModule } from '@angular/core';
import { OrdersFilterStatePipe, OrdersFilterExcludeStatePipe } from './orders-filter/orders-filter.pipe';
import { OrdersStateFetchPipe } from './orders-state-fetch/orders-state-fetch';
@NgModule({
	declarations: [OrdersFilterStatePipe, OrdersFilterExcludeStatePipe,
    OrdersStateFetchPipe],
	imports: [],
	exports: [OrdersFilterStatePipe, OrdersFilterExcludeStatePipe,
    OrdersStateFetchPipe]
})
export class PipesModule { }
