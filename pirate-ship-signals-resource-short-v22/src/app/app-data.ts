import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Ship } from './ships/ship';
import { ShipData } from './ships/ship-data';

// Required class for the In Memory Web API
export class AppData implements InMemoryDbService {

  // Creates the 'in memory' database
  // Can then issue http requests to retrieve this data,
  // just as if the data were located on a backend server
  createDb(): { ships: Ship[] } {
    const ships = ShipData.ships;
    return { ships };
  }
}
