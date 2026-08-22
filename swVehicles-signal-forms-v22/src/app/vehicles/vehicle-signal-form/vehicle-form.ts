import { Component, signal } from '@angular/core';
import { form, FormField, submit } from '@angular/forms/signals';
import { initialData, VehicleFormData, vehicleSchema } from '../vehicle';

@Component({
  selector: 'swv-vehicle-form',
  imports: [FormField],
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.css',
})
export class VehicleForm {

  // Create a form model signal with form fields
  // This represents the form's data structure
  vehicleModel = signal<VehicleFormData>(initialData);

  // Declare a form from the model and logic rules schema
  vehicleForm = form(this.vehicleModel, vehicleSchema);

  // Handle the buttons
  onSave() {
    if (this.vehicleForm().valid()) {
      submit(this.vehicleForm, () => this.onSubmit())
    }
  }

  onCancel() {
    // Reset form (or navigate to another page)
    this.vehicleForm().reset(initialData);
  }

  // Process the save
  savedMessage = signal('');
  private savedTimer = 0;

  async onSubmit() {
    // Submit to the server
    // Issue HTTP request and then add to retrieved list of vehicles

    // Show a message
    this.savedMessage.set(`Vehicle ${this.vehicleModel().vehicleName} saved!`);
    clearTimeout(this.savedTimer);
    this.savedTimer = window.setTimeout(() => {
      this.savedMessage.set('');
      // Reset form (or navigate to another page)
      this.vehicleForm().reset(initialData);
    }, 3000);
  }

}
