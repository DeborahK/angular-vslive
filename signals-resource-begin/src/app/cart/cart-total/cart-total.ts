import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../vehicles/vehicle.service';

@Component({
  selector: 'sw-cart-total',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './cart-total.html'
})
export class CartTotal {

  // Signals used in the UI
  selectedVehicle = undefined;
  price = 0;
  quantity = 1;

  subTotal = 0;
  deliveryFee = 0;
  tax = 0;
  totalPrice = 0;

}
