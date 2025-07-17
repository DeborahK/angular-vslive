import { Component, computed, inject } from '@angular/core';
import { CartService } from './cart/cart.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'swv-root',
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './app.html',
    styleUrls: ['./app.css']
})
export class App {
  pageTitle = 'Star Wars Vehicle Sales';
  cartService = inject(CartService);

  cartCount = computed(() => this.cartService.cartItems().reduce(
    (acc, item) => acc + item.quantity(), 0));

}
