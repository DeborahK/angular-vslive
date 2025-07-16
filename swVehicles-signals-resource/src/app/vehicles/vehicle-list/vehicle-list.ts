import { Component, computed, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { VehicleService } from '../vehicle.service';
import { Filter } from '../../filter/filter';
import { Vehicle } from '../vehicle';

@Component({
    selector: 'sw-vehicle-list',
    imports: [NgClass, Filter],
    templateUrl: './vehicle-list.html'
})
export class VehicleList {
  pageTitle = 'Vehicles';
  vehicleService = inject(VehicleService);
  
  errorMessage = '';
  listFilter = signal('');

  // Component signals
  filteredVehicles = computed(() => 
    this.vehicleService.vehicles().filter(v => v.name.includes(this.listFilter())));
  selectedVehicle = this.vehicleService.selectedVehicle;
  isLoading = this.vehicleService.vehiclesResource.isLoading;

  // When a vehicle is selected, set it into the signal
  onSelected(selectedVehicle: Vehicle): void {
    this.vehicleService.vehicleSelected(selectedVehicle);
  }

}
