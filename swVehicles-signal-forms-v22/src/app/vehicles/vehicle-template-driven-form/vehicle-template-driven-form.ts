import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { initialData, VehicleFormData } from '../vehicle';

@Component({
  selector: 'swv-vehicle-template-driven-form',
  templateUrl: './vehicle-template-driven-form.html',
  styleUrl: './vehicle-template-driven-form.css',
  imports: [FormsModule]
})
export class VehicleTemplateDrivenForm {
  vehicle: VehicleFormData = { ...initialData };

  // Use a signal for saved message to match project pattern
  savedMessage = signal('');
  private savedTimer = 0;

  onSave(form: NgForm) {
    if (form.valid) {
      // Simulate successful save; integrate with service if needed
      this.savedMessage.set(`Vehicle ${this.vehicle.vehicleName} saved!`);
      clearTimeout(this.savedTimer);
      this.savedTimer = window.setTimeout(() => {
        this.savedMessage.set('');
        this.vehicle = { ...initialData };
        form.resetForm(this.vehicle);
      }, 3000);
    } else {
      // Mark controls as touched so validation messages appear
      form.form.markAllAsTouched();
    }
  }

  onCancel(form?: NgForm) {
    this.vehicle = { ...initialData };
    if (form) {
      form.resetForm(this.vehicle);
    }
  }
}
