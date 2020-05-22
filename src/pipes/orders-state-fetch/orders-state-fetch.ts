import { OrdersProvider } from './../../providers/api/orders/orders.service';
import { IOrderState } from './../../app/types/order';
import { environment } from './../../enviroments/environment';
import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the OrdersStateFetchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'ordersStateFetch',
  pure: false
})
export class OrdersStateFetchPipe implements PipeTransform {

  private cachedData: any = null;
  private cachedState = '';

  constructor(private http: HttpClient, private ordersService: OrdersProvider) { }

  transform (state: string, objectCache: { [key: string]: any }): string {
    if (state !== this.cachedState) {
      this.cachedData = null;
      this.cachedState = state;
      this.ordersService.getOrderState(state).subscribe(result => {
        this.cachedData = result.body.order_states[0].name || "no disponible";
        objectCache[state] = { name: this.cachedData, color: result.body.order_states[0].color || "" };
      });
    }

    return this.cachedData;
  }
}
