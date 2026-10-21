import { httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Film } from './film';
import { ShipService } from '../ships/ship.service';

@Service()
export class FilmService {
  private url = 'api/films';
  private shipService = inject(ShipService);

  // Retrieve all films using httpResource
  // Use RegEx to ensure an id of '1' doesn't match '10' or '21'
  filmsResource = httpResource<Film[]>(
    () =>
      this.shipService.selectedShip()?.ship_id
        ? `${this.url}?ship_id=^${this.shipService.selectedShip()?.ship_id}$`
        : undefined,
    { defaultValue: [] },
  );
}
