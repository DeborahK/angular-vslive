import { Component, inject} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { VehicleService } from '../../vehicles/vehicle.service';

@Component({
  selector: 'sw-cart-total',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './cart-total.html'
})
export class CartTotal {
  private cartService = inject(CartService);
  private vehicleService = inject(VehicleService);
  
  pageTitle = `Total for:`;

  selectedVehicle = undefined;
  price = 0;
  quantity = 1;

  subTotal = 0;
  deliveryFee = 0;
  tax = 0;
  totalPrice = 0;

}
