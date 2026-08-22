import { httpResource } from '@angular/common/http';
import { Injectable, effect, linkedSignal, signal } from '@angular/core';
import { Ship } from './ship';

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  private url = 'api/ships';

  // Retrieve data with httpResource: simpliest/most flexible
  shipsResource = httpResource<Ship[]>(() => this.url, { defaultValue: [] });

  selectedShip = linkedSignal<Ship[], Ship | undefined>({
    source: this.shipsResource.value,
    computation: (ships, previous) =>
      ships.find(ship => ship.name === previous?.value?.name) ?? undefined
  });

  // Accessing the resource generates an error if the http request fails
  private eff = effect(() => {
    if (!this.shipsResource.error()) {
      console.log('Ships', JSON.stringify(this.shipsResource.value()));
    } else {
      console.error('Failed to load ships', this.shipsResource.error()?.message);
    }
  });

}
