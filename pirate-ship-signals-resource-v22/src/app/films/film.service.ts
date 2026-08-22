import { httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Film } from './film';
import { ShipService } from '../ships/ship.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private url = 'api/films';
  private shipService = inject(ShipService);

  // Retrieve all films using httpResource
  filmsResource = httpResource<Film[]>(() => 
    `${this.url}?ship_id=${this.shipService.selectedShip()?.ship_id}`, 
    { defaultValue: [] });

}
