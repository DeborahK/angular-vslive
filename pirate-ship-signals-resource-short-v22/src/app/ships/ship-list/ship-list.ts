import { Component, computed, inject } from '@angular/core';
import { ShipService } from '../ship.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sw-ship-list',
  imports: [FormsModule],
  templateUrl: './ship-list.html',
  styleUrls: ['./ship-list.css']
})
export class ShipList {
  pageTitle = 'Ships';
  private shipService = inject(ShipService);

  // Component signals
  selectedShip = this.shipService.selectedShip;

  ships = this.shipService.shipsResource.value;
  isLoading = this.shipService.shipsResource.isLoading;
  error = this.shipService.shipsResource.error;
  errorMessage = computed(() => this.error() ? this.error()?.message : '');

}
