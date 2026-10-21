import { httpResource } from '@angular/common/http';
import { Service, effect, linkedSignal } from '@angular/core';
import { Ship } from './ship';

@Service()
export class ShipService {
  private url = 'api/ships';

  // Retrieve data with httpResource: simplest/most flexible
  shipsResource = httpResource<Ship[]>(() => this.url, { defaultValue: [] });

  // Use linkedSignal to maintain a writable state while
  // responding to changes in another signal
  selectedShip = linkedSignal<Ship[], Ship | undefined>({
    source: this.shipsResource.value,
    computation: (ships, previous) =>
      ships.find((ship) => ship.ship_id === previous?.value?.ship_id) ??
      undefined,
  });

  // Accessing the resource generates an error if the http request fails
  private eff = effect(() => {
    if (!this.shipsResource.error()) {
      console.log('Ships', JSON.stringify(this.shipsResource.value()));
    } else {
      console.error(
        'Failed to load ships',
        this.shipsResource.error()?.message,
      );
    }
  });
}
