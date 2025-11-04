import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'sw-vehicle-list',
  imports: [FormsModule],
  templateUrl: './vehicle-list.html'
})
export class VehicleList {
  pageTitle = 'Vehicles';
  private vehicleService = inject(VehicleService);

  selectedVehicle: Vehicle | undefined = undefined;

  vehicles: Vehicle[] = [];
  isLoading = false;
  error = false;
  errorMessage = '';

}
