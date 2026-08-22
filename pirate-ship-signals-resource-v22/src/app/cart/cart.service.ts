import { Injectable, computed, effect, inject, linkedSignal } from "@angular/core";
import { ShipService } from "../ships/ship.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private shipService = inject(ShipService);

  // Manage state with signals
  quantity = linkedSignal({
    source: this.shipService.selectedShip,
    computation: v => 1
  });
  // quantity = signal(1);

  price = computed(() => this.shipService.selectedShip()?.price ?? 0);

  // Total before delivery and tax
  subTotal = computed(() => this.quantity() * this.price());

  // Delivery is free if spending more than 50000 gold coins
  deliveryFee = computed(() => this.subTotal() < 50000 ? 999 : 0);

  // Tax could be based on shipping address zip code
  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100);

  // Total price
  totalPrice = computed(() => this.subTotal() + this.deliveryFee() + this.tax());

  eff = effect(() => console.log('Qty:', this.quantity()));
}
