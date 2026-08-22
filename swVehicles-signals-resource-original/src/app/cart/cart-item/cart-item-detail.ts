import { Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartItem } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'sw-cart-item',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './cart-item-detail.html'
})
export class CartItemDetail {
  cartService = inject(CartService);

  // Provided by parent component
  cartItem = input.required<CartItem>();

  // When the quantity or item changes, recalculate the extended price
  itemTotal = computed(() =>
    this.cartItem().quantity() * Number(this.cartItem()?.vehicle.cost_in_credits));

  onRemove(): void {
    this.cartService.removeFromCart(this.cartItem()?.vehicle.name ?? '');
  }
}
