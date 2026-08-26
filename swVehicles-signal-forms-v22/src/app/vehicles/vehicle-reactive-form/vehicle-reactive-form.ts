import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { initialData } from '../vehicle';

@Component({
  selector: 'swv-vehicle-reactive-form',
  templateUrl: './vehicle-reactive-form.html',
  styleUrl: './vehicle-reactive-form.css',
  imports: [ReactiveFormsModule],
})
export class VehicleReactiveForm {
  private readonly destroyRef = inject(DestroyRef);
  readonly savedMessage = signal('');
  private savedTimer = 0;

  private readonly fb = inject(FormBuilder);

  readonly vehicleForm = this.fb.group({
    vehicleName: ['', [Validators.required, Validators.minLength(5)]],
    vehicleType: ['', Validators.required],
    description: ['', Validators.minLength(10)],
    occupancy: [NaN, Validators.min(0)],
    manufactureDate: [null as Date | null],
  });

  constructor() {
    this.destroyRef.onDestroy(() => {
      clearTimeout(this.savedTimer);
    });
  }

  onSave() {
    if (this.vehicleForm.valid) {
      const formValue = this.vehicleForm.value;
      this.savedMessage.set(`Vehicle ${formValue.vehicleName} save simulated!`);
      clearTimeout(this.savedTimer);
      this.savedTimer = window.setTimeout(() => {
        this.savedMessage.set('');
        this.vehicleForm.reset(initialData);
      }, 3000);
    } else {
      this.vehicleForm.markAllAsTouched();
    }
  }

  onCancel() {
    // Clear any message or timer
    clearTimeout(this.savedTimer);
    this.savedTimer = 0;
    this.savedMessage.set('');

    // Reset the form
    this.vehicleForm.reset(initialData);
  }
}
