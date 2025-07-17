import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItemDetail } from '../cart-item/cart-item-detail';

@Component({
    selector: 'sw-cart-list',
    imports: [ CartItemDetail ],
    templateUrl: 'cart-list.html'
})
export class CartList {
  pageTitle = 'Cart';

  cartService = inject(CartService);

  cartItems = this.cartService.cartItems;
}
