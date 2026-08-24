import { Ship } from "./ship";

export class ShipData {

  // Famous pirate ships sample data
  static ships: Ship[] = [
    {
      ship_id: 1,
      cargo_capacity: 100,
      price: 50000,
      crew: 150,
      manufacturer: "Port Royal Shipyards",
      model: "Galleon",
      name: "Queen Anne's Revenge",
      passengers: 20,
      ship_class: "pirate ship"
    },
    {
      ship_id: 2,
      cargo_capacity: 80,
      price: 80000,
      crew: 100,
      manufacturer: "London Docks",
      model: "East Indiaman",
      name: "Black Pearl",
      passengers: 10,
      ship_class: "pirate ship"
    },
    {
      ship_id: 3,
      cargo_capacity: 60,
      price: 40000,
      crew: 80,
      manufacturer: "Spanish Main",
      model: "Brigantine",
      name: "Adventure Galley",
      passengers: 15,
      ship_class: "pirate ship"
    },
    {
      ship_id: 4,
      cargo_capacity: 120,
      price:25000,
      crew: 200,
      manufacturer: "Bristol Shipyards",
      model: "Frigate",
      name: "Royal Fortune",
      passengers: 25,
      ship_class: "pirate ship"
    },
    {
      ship_id: 5,
      cargo_capacity: 90,
      price: 20000,
      crew: 60,
      manufacturer: "Tortuga Shipwrights",
      model: "Schooner",
      name: "Flying Dutchman",
      passengers: 12,
      ship_class: "ghost ship"
    },
    {
      ship_id: 6,
      cargo_capacity: 70,
      price: 75000,
      crew: 50,
      manufacturer: "Neverland Docks",
      model: "Barque",
      name: "Jolly Roger",
      passengers: 8,
      ship_class: "pirate ship"
    },
    {
      ship_id: 7,
      cargo_capacity: 110,
      price: 30000,
      crew: 120,
      manufacturer: "Portsmouth Naval Yard",
      model: "Man-of-war",
      name: "Revenge",
      passengers: 18,
      ship_class: "pirate ship"
    },
    {
      ship_id: 8,
      cargo_capacity: 85,
      price: 45000,
      crew: 90,
      manufacturer: "Barbary Coast Shipbuilders",
      model: "Xebec",
      name: "Whydah Gally",
      passengers: 14,
      ship_class: "pirate ship"
    },
    {
      ship_id: 9,
      cargo_capacity: 95,
      price: 50000,
      crew: 70,
      manufacturer: "Jamaica Shipyards",
      model: "Sloop",
      name: "Royal James",
      passengers: 9,
      ship_class: "pirate ship"
    },
    {
      ship_id: 10,
      cargo_capacity: 130,
      price: 60000,
      crew: 160,
      manufacturer: "Singapore Shipwrights",
      model: "Junk",
      name: "Empress",
      passengers: 30,
      ship_class: "pirate ship"
    }
  ]
}