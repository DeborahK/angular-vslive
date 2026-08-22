import { Component, computed, inject } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'sw-vehicle-list',
  imports: [FormsModule],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.css'
})
export class VehicleList {
  pageTitle = 'Vehicles';
  private vehicleService = inject(VehicleService);
  private router = inject(Router);

  // Component signals
  selectedVehicle = this.vehicleService.selectedVehicle;

  vehicles = this.vehicleService.vehiclesResource.value;
  isLoading = this.vehicleService.vehiclesResource.isLoading;
  error = this.vehicleService.vehiclesResource.error;
  errorMessage = computed(() => this.error() ? this.error()?.message : '');

  addVehicle() {
    this.router.navigate(['/vehicle-form']);
  }
}
