import { signal, WritableSignal } from "@angular/core";
import { Vehicle } from "../vehicles/vehicle";

export interface Cart {
  cartItems: CartItem[]
}

export interface CartItem {
  vehicle: Vehicle;
  quantity: WritableSignal<number>;
}

// Sample data
export class CartData {
  static cartData: CartItem[] = [
    {
      vehicle: {
        cargo_capacity: 0,
        crew: 0,
        name: 'AT-AT',
        model: '',
        manufacturer: '',
        cost_in_credits: '36442.73',
        passengers: 0,
        vehicle_class: 'assault walker',
        films: []
      },
      quantity: signal(1)
    }
  ]
}
