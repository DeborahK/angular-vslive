import { HttpClient } from '@angular/common/http';
import { Service, effect, inject } from '@angular/core';
import { forkJoin} from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { VehicleService } from '../vehicles/vehicle.service';
import { Film } from './film';
import { getNestedError } from '../utils/error-handling';

@Service()
export class FilmService {
  private http = inject(HttpClient);
  private vehicleService = inject(VehicleService);

  // Retrieve data with rxResource: Best for complex data
  vehicleFilmsResource = rxResource({
    params: this.vehicleService.selectedVehicle,
    stream: p => forkJoin(p.params.films.map(link =>
      this.http.get<Film>(link)
    )),
    defaultValue: []
  });
  // Manage the error message in the service
  // OR in the component
  // error = this.vehicleFilmsResource.error;
  // errorMessage = computed(() => {
  //   const err = this.error();
  //   if (err) {
  //     return `Error retrieving films: ${getNestedError(err)}`;
  //   } else {
  //     return ''
  //   }
  // });

}
