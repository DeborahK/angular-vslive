# Demo Instructions

## Replace the ship.service.ts file with this:

import { Injectable, signal } from '@angular/core';
import { Ship } from './ship';

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  private url = 'api/ships';

  // Expose signals from this service
  selectedShip = signal<Ship | undefined>(undefined);

}

## Replace the ship-list.ts file with this:

import { Component, computed, inject, signal } from '@angular/core';
import { ShipService } from '../ship.service';
import { FormsModule } from '@angular/forms';
import { Ship } from '../ship';

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

  ships = signal<Ship[]>([]);
  isLoading = signal(false);
  error = signal<Error|undefined>(undefined);
  errorMessage = computed(() => this.error() ? this.error()?.message : '');

  refreshData() {
  }
}

## Replace the film.service.ts file with this:

import { httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Film } from './film';
import { ShipService } from '../ships/ship.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private url = 'api/films';
  private shipService = inject(ShipService);

  // `${this.url}?ship_id=${this.shipService.selectedShip()?.ship_id}`
}

## Replace the ship-detail.ts file with this:

import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ShipService } from '../ship.service';
import { FilmService } from '../../films/film.service';
import { Film } from '../../films/film';

@Component({
  selector: 'sw-ship-detail',
  imports: [DecimalPipe],
  templateUrl: './ship-detail.html',
  styleUrls: ['./ship-detail.css']
})
export class ShipDetail {
  private shipService = inject(ShipService);
  private filmService = inject(FilmService);

  // Signals used in the template
  ship = this.shipService.selectedShip;
  films = signal<Film[]>([]);
  pageTitle = computed(() => this.ship() ? `Detail for: ${this.ship()?.name}` : '');

}

## Start the application!

## Add code to retrieve the ships using httpResource (ship.service.ts)
  shipsResource = httpResource<Ship[]>(() => this.url, {defaultValue: []});

## Adjust the code in the component (ship-list.ts)
  ships = this.shipService.shipsResource.value;
  isLoading = this.shipService.shipsResource.isLoading;
  error = this.shipService.shipsResource.error;

## Add the refresh code
  refreshData() {
    this.shipService.shipsResource.reload();
  }

## Show the code in the template

## Add code to retrieve the films using httpResource and a parameter (film.service.ts)
  filmsResource = httpResource<Film[]>(() => 
    `${this.url}?ship_id=${this.shipService.selectedShip()?.ship_id}`, 
    { defaultValue: [] });

## Adjust the code in the component (ship-detail.ts)
  films = this.filmService.filmsResource.value;

## Show the code in the template

## Change the selectedShip to a linkedSignal
  selectedShip = linkedSignal<Ship[], Ship | undefined>({
    source: this.shipsResource.value,
    computation: (ships, previous) =>
      ships.find(ship => ship.name === previous?.value?.name) ?? undefined
  });
