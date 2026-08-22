import { Component } from '@angular/core';
import { ShipList } from "../ship-list/ship-list";
import { ShipDetail } from "../ship-detail/ship-detail";
import { CartTotal } from '../../cart/cart-total/cart-total';

@Component({
  selector: 'sw-ship-shell',
  template: `
    <div class="body">
      <div class="list-container">
        <sw-ship-list />
      </div>
      <div class="detail-container">
        <sw-ship-detail />
      </div>
      <div class="total-container">
        <sw-cart-total />
      </div>
    </div>
  `,
  styleUrls: ['./ship-shell.css'],
  imports: [ShipList, ShipDetail, CartTotal]
})
export class ShipShell {

}
