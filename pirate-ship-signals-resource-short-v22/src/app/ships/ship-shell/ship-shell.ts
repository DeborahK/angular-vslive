import { Component } from '@angular/core';
import { ShipList } from "../ship-list/ship-list";
import { CartTotal } from '../../cart/cart-total/cart-total';

@Component({
  selector: 'sw-ship-shell',
  template: `
    <div class="body">
      <div class="list-container">
        <sw-ship-list />
      </div>
      <div class="total-container">
        <sw-cart-total />
      </div>
    </div>
  `,
  styleUrls: ['./ship-shell.css'],
  imports: [ShipList, CartTotal]
})
export class ShipShell {

}
