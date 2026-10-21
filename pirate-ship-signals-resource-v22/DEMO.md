# Demo Instructions

# Set up (DAY BEFORE)
* Update files (see Replacement Instructions below):
  cart.service.ts, cart-total.ts, ship.service.ts, ship-list.ts, ship-detail.ts, film.service.ts

# Set up (RIGHT BEFORE TALK)
* Launch VS Code with project
* Open needed files: cart.service.ts, cart-total.ts, ship.service.ts, ship-list.ts, ship-detail.ts, film.service.ts

# Basic Signals

## *** RUN ***

HTML has errors ... ignore for now

## cart.service.ts
```
  quantity = signal(1);
  price = signal(5000);
  
  subTotal = computed(() => this.quantity() * this.price());
  deliveryFee = computed(() => this.subTotal() < 50000 ? 999 : 0);
  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100);
  totalPrice = computed(() => this.subTotal() + this.deliveryFee() + this.tax());
```
## cart-total.ts
```
  price = this.cartService.price;
  quantity = this.cartService.quantity;

  subTotal = this.cartService.subTotal;
  deliveryFee = this.cartService.deliveryFee;
  tax = this.cartService.tax;
  totalPrice = this.cartService.totalPrice;
```
## cart-total.html

* View bindings
* View two-way binding

## *** RUN ***

When quantity changes, the calculated properties automatically change!

# Retrieve Ships with httpResource()

## ship.service.ts
```
shipsResource = httpResource<Ship[]>(() => this.url, { defaultValue: [] });
```
## ship-list.ts
```
  ships = this.shipService.shipsResource.value;
  isLoading = this.shipService.shipsResource.isLoading;
  error = this.shipService.shipsResource.error;
```

## *** RUN ***

Can now see the list of ships

# Handle the selected ship

*** Can NOT handle selectedShip until data is retrieved ***

## ship.service.ts
```
  // Expose signals from this service
  selectedShip = signal<Ship | undefined>(undefined);
```

## cart.service.ts
```
  price = computed(() => this.shipService.selectedShip()?.price ?? 0);
```

## ship-detail.ts
```
  ship = this.shipService.selectedShip;

  pageTitle = computed(() => this.ship() ? 
    `Detail for: ${this.ship()?.name}` : 'Detail');
```

## cart-total.html
Uncomment the first and last lines
```
@if (selectedShip()) {
}
```

## *** RUN ***

Selected ship now works!

# Add films

## film.service.ts
  filmsResource = httpResource<Film[]>(() => 
    `${this.url}?ship_id=^${this.shipService.selectedShip()?.ship_id}$`, 
    { defaultValue: [] });

## ship-detail.ts
```
  films = this.filmService.filmsResource.value;
  isLoadingFilm = this.filmService.filmsResource.isLoading;
```


# REPLACEMENT INSTRUCTIONS

## Replace the cart.service.ts file with this:
import { computed, inject, Service, signal } from "@angular/core";
import { ShipService } from "../ships/ship.service";

@Service()
export class CartService {
  private shipService = inject(ShipService);

}

## Replace the cart-total.ts file with this:
import { Component, inject, signal, computed } from '@angular/core';
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

  selectedShip = this.shipService.selectedShip;
  pageTitle = signal('Total');

}

## Modify the cart-total.html file to comment out the first and last lines
<!-- @if (selectedShip()) { -->
<!-- } -->

## Replace the ship.service.ts file with this:
import { Service, signal } from '@angular/core';
import { Ship } from './ship';

@Service()
export class ShipService {
  private url = 'api/ships';

  selectedShip = signal(undefined);

}

## Replace the ship-list.ts file with this:
import { Component, computed, inject, signal } from '@angular/core';
import { ShipService } from '../ship.service';
import { FormsModule } from '@angular/forms';
import { Ship } from '../ship';

@Component({
  selector: 'sw-ship-list',
  imports: [FormsModule],
  templateUrl: './ship-list.html',
  styleUrls: ['./ship-list.css']
})
export class ShipList {
  pageTitle = 'Ships';
  private shipService = inject(ShipService);

  // Component signals
  selectedShip = this.shipService.selectedShip;

  ships = signal<Ship[]>([]);
  isLoading = signal(false);
  error = signal<Error|undefined>(undefined);

}

## Replace the ship-detail.ts file with this:
import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ShipService } from '../ship.service';
import { FilmService } from '../../films/film.service';

@Component({
  selector: 'sw-ship-detail',
  imports: [DecimalPipe],
  templateUrl: './ship-detail.html',
  styleUrls: ['./ship-detail.css']
})
export class ShipDetail {
  private shipService = inject(ShipService);
  private filmService = inject(FilmService);

  ship = signal(undefined);
  films = signal(undefined);
  isLoadingFilm = signal(undefined);
  
  pageTitle = signal('Detail');

}

## Replace the film.service.ts file with this:
import { httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Film } from './film';
import { ShipService } from '../ships/ship.service';

@Service()
export class FilmService {
  private url = 'api/films';
  private shipService = inject(ShipService);

  // `${this.url}?ship_id=^${this.shipService.selectedShip()?.ship_id}$`
}
