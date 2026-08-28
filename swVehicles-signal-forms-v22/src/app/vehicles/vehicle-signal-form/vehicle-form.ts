import { Component, DestroyRef, inject, signal } from '@angular/core';
import { form, FormField, submit } from '@angular/forms/signals';
import { initialData, VehicleFormData, vehicleSchema } from '../vehicle';
import { Router } from '@angular/router';

@Component({
  selector: 'swv-vehicle-form',
  imports: [FormField],
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.css',
})
export class VehicleForm {
  private readonly router = inject(Router);
  savedMessage = signal('');

  // Create a form model signal with form fields
  // This represents the form's data structure
  vehicleModel = signal<VehicleFormData>(initialData);

  // Declare a form from the model and logic rules schema
  vehicleForm = form(this.vehicleModel, vehicleSchema);

  // Handle the buttons
  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    submit(this.vehicleForm, async () => {
      // Handle the form submission here
      // Reset form or navigate to another page
      this.savedMessage.set(`Vehicle ${this.vehicleModel().vehicleName} save simulated!`);

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 3000);
      });
      await this.router.navigate(['/vehicles']);
    });
  }

  onCancel() {
    // Clear the message
    this.savedMessage.set('');

    // Reset form (or navigate to another page)
    this.vehicleForm().reset(initialData);
  }
}
