import { Component} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sw-cart-total',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './cart-total.html'
})
export class CartTotal {

  selectedVehicle = undefined;
  price = 0;
  quantity = 1;

  subTotal = 0;
  deliveryFee = 0;
  tax = 0;
  totalPrice = 0;

}
