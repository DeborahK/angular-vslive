import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Film } from '../../films/film';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'sw-vehicle-detail',
  imports: [DecimalPipe],
  templateUrl: './vehicle-detail.html'
})
export class VehicleDetail {

  vehicle: Vehicle | undefined = undefined;
  pageTitle = 'Detail for:';

  vehicleFilms: Film[] = [];
  errorMessage = '';
}
