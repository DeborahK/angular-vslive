import { Component, computed, inject } from '@angular/core';
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

  // Signals used in the template
  ship = this.shipService.selectedShip;
  films = this.filmService.filmsResource.value;
  isLoadingFilm = this.filmService.filmsResource.isLoading;
  
  pageTitle = computed(() => this.ship() ? `Detail for: ${this.ship()?.name}` : 'Detail');

}
