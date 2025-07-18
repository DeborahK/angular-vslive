import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'sw-vehicle-list',
  imports: [FormsModule],
  templateUrl: './vehicle-list.html'
})
export class VehicleList {
  pageTitle = 'Vehicles';

  selectedVehicle: Vehicle | undefined = undefined;

  vehicles: Vehicle[] = [];
  isLoading = false;
  error = false;
  errorMessage = '';

}
