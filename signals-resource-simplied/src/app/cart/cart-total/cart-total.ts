import { Component, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { CartService } from '../cart.service';

@Component({
    selector: 'sw-cart-total',
    imports: [DecimalPipe],
    templateUrl: './cart-total.html'
})
export class CartTotal {
  cartService = inject(CartService);

  cartItems = this.cartService.cartItems;

  subTotal = this.cartService.subTotal;

  deliveryFee = this.cartService.deliveryFee;

  tax = this.cartService.tax;

  totalPrice = this.cartService.totalPrice;
  
}
