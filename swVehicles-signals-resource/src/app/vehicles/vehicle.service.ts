import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, ResourceStatus, computed, effect, inject, signal } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Film, Vehicle, VehicleResponse } from './vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private url = 'https://swapi.py4e.com/api/vehicles';
  private http = inject(HttpClient);

  // Retrieve data with httpResource: simpliest/most flexible
  vehiclesResource = httpResource<VehicleResponse>(() => this.url);

  // Expose signals from this service
  selectedVehicle = signal<Vehicle | undefined>(undefined);

  // If the price is empty, randomly assign a price
  // (We can't modify the backend in this demo)
  // NOTE: The data is returned as a 'VehicleResponse', with a 'results' property with the vehicles
  vehicles = computed(() => this.vehiclesResource.value()?.results.map((v) => ({
      ...v,
      cost_in_credits: isNaN(Number(v.cost_in_credits))
        ? String(Math.random() * 100000)
        : v.cost_in_credits,
    }) as Vehicle) ?? []
  );

  // Retrieve data with rxResource: Best for complex data
  vehicleFilmsResource = rxResource({
    params: this.selectedVehicle,
    stream: ({ params: vehicle }) => {
      if (vehicle) {
       return forkJoin(vehicle.films.map(link =>
        this.http.get<Film>(link)));
      }
      return of([] as Film[]);
    },
    defaultValue: []
  });

  // When the user selects a vehicle, set it into the signal
  // Can't use two-way binding because the UI displays buttons
  vehicleSelected(selectedVehicle: Vehicle) {
    this.selectedVehicle.set(selectedVehicle);
  }

  private eff = effect(() => {
    // console.log('Status:',ResourceStatus[this.vehiclesResource.status()])
    console.log('Value:', this.vehiclesResource.value())
  });
}
