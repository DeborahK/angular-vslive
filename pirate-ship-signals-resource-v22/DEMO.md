# Demo Instructions

# Set up
* Update files (see Replacement Instructions below)
* Open needed files
* Run the application
* Set browser to 125%

# Basic Signals

## *** DO NOT RUN ***

Do NOT attempt to run ... HTML has errors

## ship.service.ts
  // Expose signals from this service
  selectedShip = signal<Ship | undefined>(undefined);

## ship-detail.ts
```
  ship = this.shipService.selectedShip;
  pageTitle = computed(() => this.ship() ? `Detail for: ${this.ship()?.name}` : '');
```

## cart.service.ts
```
  // Initial value
  quantity = signal(1);
  price = computed(() => this.shipService.selectedShip()?.price ?? 0);
  
  subTotal = computed(() => this.quantity() * this.price());
  deliveryFee = computed(() => this.subTotal() < 50000 ? 999 : 0);
  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100);
  totalPrice = computed(() => this.subTotal() + this.deliveryFee() + this.tax());
```
## cart-total.ts
```
  selectedShip = this.shipService.selectedShip;
  price = this.cartService.price;
  quantity = this.cartService.quantity;

  subTotal = this.cartService.subTotal;
  deliveryFee = this.cartService.deliveryFee;
  tax = this.cartService.tax;
  totalPrice = this.cartService.totalPrice;
```
## cart-total.html

* Fix bindings
* NOT two-way binding

## *** RUN ***

When quantity changes, the calculated properties automatically change!

## *** RUN ***

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
  errorMessage = computed(() => this.error() ? this.error()?.message : '');
```
## ship-list.html

Change each variable to read a signal:
* isLoading
* errorMessage (2 times)
* ships

## *** RUN ***

Can now see the list of ships

# Add films (if time permits)

## Add code to retrieve the films using httpResource and a parameter (film.service.ts)
  filmsResource = httpResource<Film[]>(() => 
    `${this.url}?ship_id=${this.shipService.selectedShip()?.ship_id}`, 
    { defaultValue: [] });

## Adjust the code in the component (ship-detail.ts)
  films = this.filmService.filmsResource.value;


# REPLACEMENT INSTRUCTIONS

## Replace the cart.service.ts file with this:
import { inject, Service } from "@angular/core";
import { ShipService } from "../ships/ship.service";

@Service()
export class CartService {
  private shipService = inject(ShipService);

}

## Replace the cart-total.ts file with this:
import { Component, inject } from '@angular/core';
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

}

## Replace the ship.service.ts file with this:

import { Service, signal } from '@angular/core';
import { Ship } from './ship';

@Service()
export class ShipService {
  private url = 'api/ships';

}

## Replace the ship-detail.ts file with this:

import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ShipService } from '../ship.service';
import { FilmService } from '../../films/film.service';
import { Film } from '../../films/film';

@Component({
  selector: 'sw-ship-detail',
  imports: [DecimalPipe],
  templateUrl: './ship-detail.html',
  styleUrls: ['./ship-detail.css']
})
export class ShipDetail {
  private shipService = inject(ShipService);
  private filmService = inject(FilmService);

  // Signals used in the template
  ship = this.shipService.selectedShip;
  films = signal<Film[]>([]);
  pageTitle = computed(() => this.ship() ? `Detail for: ${this.ship()?.name}` : '');

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
  errorMessage = computed(() => this.error() ? this.error()?.message : '');

  refreshData() {
  }
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

  // `${this.url}?ship_id=${this.shipService.selectedShip()?.ship_id}`
}
