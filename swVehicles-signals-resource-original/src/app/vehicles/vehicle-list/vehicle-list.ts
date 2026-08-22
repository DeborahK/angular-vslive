import { Component, computed, inject } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'sw-vehicle-list',
    imports: [FormsModule],
    templateUrl: './vehicle-list.html'
})
export class VehicleList {
  pageTitle = 'Vehicles';
  vehicleService = inject(VehicleService);
  selectedVehicle = this.vehicleService.selectedVehicle;

  // Component signals
  vehicles = this.vehicleService.vehicles;
  isLoading = this.vehicleService.vehiclesResource.isLoading;
  error = this.vehicleService.vehiclesResource.error;
  errorMessage = computed(() => this.error() ? this.error()?.message : '');

}
