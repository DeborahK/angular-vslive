import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, effect, inject } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { VehicleService } from '../vehicles/vehicle.service';
import { Film } from './film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private http = inject(HttpClient);
  private vehicleService = inject(VehicleService);

  // Retrieve data with rxResource: Best for complex data
  vehicleFilmsResource = rxResource({
    params: this.vehicleService.selectedVehicle,
    stream: ({ params: vehicle }) => {
      if (vehicle) {
        return forkJoin(vehicle.films.map(link =>
          this.http.get<Film>(link)));
      }
      return of([] as Film[]);
    },
    defaultValue: []
  });

  eff = effect(() => console.log('url', this.vehicleService.selectedVehicle()?.films));
}
