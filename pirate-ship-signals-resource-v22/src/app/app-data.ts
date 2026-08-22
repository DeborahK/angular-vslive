import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Ship } from './ships/ship';
import { ShipData } from './ships/ship-data';
import { Film } from './films/film';
import { FilmData } from './films/film-data';

// Required class for the In Memory Web API
export class AppData implements InMemoryDbService {

  // Creates the 'in memory' database
  // Can then issue http requests to retrieve this data,
  // just as if the data were located on a backend server
  createDb(): { ships: Ship[], films: Film[] } {
    const ships = ShipData.ships;
    const films = FilmData.films;
    return { ships, films };
  }
}
