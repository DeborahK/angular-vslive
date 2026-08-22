import { min, minLength, required, schema } from "@angular/forms/signals";

export interface Vehicle {
  cargo_capacity: number;
  crew: number;
  name: string;
  model: string;
  manufacturer: string,
  cost_in_credits: number,
  passengers: number;
  vehicle_class: string;
  films: string[];
}

export interface VehicleFormData {
  vehicleName: string;
  vehicleType: string;
  description: string;
  occupancy: number;
  manufactureDate: Date | null; // null is the empty value for Date bound to <input type=date> 
}

export const initialData: VehicleFormData = {
  vehicleName: '',
  vehicleType: '',
  description: '',
  occupancy: NaN,
  manufactureDate: null
}

export const vehicleSchema = schema<VehicleFormData>(rootPath => {
  required(rootPath.vehicleName, { message: 'Vehicle name is required' });
  minLength(rootPath.vehicleName, 5, { message: 'The vehicle name must be at least 5 characters' });
  required(rootPath.vehicleType, { message: 'Vehicle type is required' });
  min(rootPath.occupancy, 0, { message: 'The occupancy can not be negative' });
  minLength(rootPath.description, 10, { message: 'The description must be at least 10 characters' });
});

