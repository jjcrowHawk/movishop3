import { Pipe, PipeTransform } from '@angular/core';
import { IOrder } from './../../types/order';

/**
 * Generated class for the OrdersFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'ordersFilterState',
})
export class OrdersFilterStatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform (orders: IOrder[], states?: string[]) {
    return orders.filter(order => states.includes(order.current_state));
  }
}

@Pipe({
  name: 'ordersFilterExcludeState',
})
export class OrdersFilterExcludeStatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform (orders: IOrder[], states?: string[]) {
    return orders.filter(order => !states.includes(order.current_state));
  }
}

