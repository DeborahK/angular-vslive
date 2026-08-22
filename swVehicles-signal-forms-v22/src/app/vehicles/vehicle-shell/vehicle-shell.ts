import { Component, ChangeDetectionStrategy } from '@angular/core';
import { VehicleList } from "../vehicle-list/vehicle-list";
import { VehicleDetail } from "../vehicle-detail/vehicle-detail";
import { CartTotal } from '../../cart/cart-total/cart-total';

@Component({
    selector: 'sw-vehicle-shell',
    template: `
      <div class='shell'>
        <div class='list-container'>
          <sw-vehicle-list/>
        </div>
        <div class='detail-container'>
          <sw-vehicle-detail/>
        </div>
        <div class='total-container'>
          <sw-cart-total/>
        </div>
      </div>
    `,
    styleUrl: './vehicle-shell.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [VehicleList, VehicleDetail, CartTotal]
})
export class VehicleShell {

}
