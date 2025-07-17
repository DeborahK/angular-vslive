import { Component, computed, effect, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';
import { CartService } from '../../cart/cart.service';
import { FilmService } from '../../films/film.service';

@Component({
  selector: 'sw-vehicle-detail',
  imports: [DecimalPipe],
  templateUrl: './vehicle-detail.html'
})
export class VehicleDetail {
  cartService = inject(CartService);
  vehicleService = inject(VehicleService);
  filmService = inject(FilmService);

  // Signals used in the template
  vehicle = this.vehicleService.selectedVehicle;
  pageTitle = computed(() => this.vehicle() ? `Detail for: ${this.vehicle()?.name}` : '');

  vehicleFilms = this.filmService.vehicleFilmsResource.value;
  error = this.filmService.vehicleFilmsResource.error;
  errorMessage = computed(() => this.error() ? this.error()?.message : '');

  addToCart(vehicle: Vehicle | undefined) {
    if (vehicle) {
      this.cartService.addToCart(vehicle);
    }
  }

  eff = effect(() => console.log('Error:', this.error()));
}
