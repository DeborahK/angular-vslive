import { Component, inject, signal } from '@angular/core';
import { FieldTree, form, FormField, FormRoot, submit } from '@angular/forms/signals';
import { initialData, VehicleFormData, vehicleSchema } from '../vehicle';

@Component({
  selector: 'swv-vehicle-form',
  imports: [FormField, FormRoot],
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.css',
})
export class VehicleForm {
  savedMessage = signal('');

  // Create a form model signal with form fields
  // This represents the form's data structure
  vehicleModel = signal<VehicleFormData>(initialData);

  // Declare a form from the model and logic rules schema
  vehicleForm = form(this.vehicleModel, vehicleSchema, {
    submission: {
      action: async (vehicleFieldTree) => this.saveVehicle(vehicleFieldTree),
    },
  });

  private async saveVehicle(vehicleFieldTree: FieldTree<VehicleFormData>) {
    // Handle the form submission
    console.log('Submitting data:', JSON.stringify(vehicleFieldTree().value()));

    this.savedMessage.set(`Vehicle ${vehicleFieldTree.vehicleName().value()} save simulated!`);
    await new Promise<void>((resolve) => setTimeout(resolve, 3000));

    // Reset form or navigate to another page
    this.savedMessage.set('');
    this.vehicleForm().reset(initialData);
  }

  onCancel() {
    // Clear the message
    this.savedMessage.set('');

    // Reset form (or navigate to another page)
    this.vehicleForm().reset(initialData);
  }
}
