import { httpResource } from '@angular/common/http';
import { Injectable, ResourceStatus, effect, signal } from '@angular/core';
import { Vehicle } from './vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private url = 'api/vehicles';

  // Expose signals from this service
  selectedVehicle = signal<Vehicle | undefined>(undefined);

  // Retrieve data with httpResource: simpliest/most flexible
  vehiclesResource = httpResource<Vehicle[]>(() => this.url);

  private eff = effect(() => {
    // console.log('Status:',ResourceStatus[this.vehiclesResource.status()])
    console.log('Value:', this.vehiclesResource.value())
  });
}
