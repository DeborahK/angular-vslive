import { Component, inject, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';
import { ShipService } from '../../ships/ship.service';

@Component({
  selector: 'sw-cart-total',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './cart-total.html',
  styleUrls: ['./cart-total.css']
})
export class CartTotal {
  private cartService = inject(CartService);
  private shipService = inject(ShipService);

  // Signals used in the UI
  selectedShip = this.shipService.selectedShip;
  pageTitle = computed(() => this.selectedShip() ? `Total for: ${this.selectedShip()?.name}` : '');

  price = this.cartService.price;
  quantity = this.cartService.quantity;

  subTotal = this.cartService.subTotal;
  deliveryFee = this.cartService.deliveryFee;
  tax = this.cartService.tax;
  totalPrice = this.cartService.totalPrice;

}
