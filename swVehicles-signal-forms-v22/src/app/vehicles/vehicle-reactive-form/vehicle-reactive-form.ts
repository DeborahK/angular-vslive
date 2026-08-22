import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { initialData } from '../vehicle';

@Component({
  selector: 'swv-vehicle-reactive-form',
  templateUrl: './vehicle-reactive-form.html',
  styleUrl: './vehicle-reactive-form.css',
  imports: [ReactiveFormsModule]
})
export class VehicleReactiveForm {
  private fb = inject(FormBuilder);
  vehicleForm: FormGroup;

  constructor() {
    this.vehicleForm = this.fb.group({
      vehicleName: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      vehicleType: ['', Validators.required],
      description: ['', Validators.minLength(10)],
      occupancy: [NaN, Validators.min(0)],
      manufactureDate: [null]
    });
  }

  savedMessage = signal('');
  private savedTimer = 0;
  onSave() {
    if (this.vehicleForm.valid) {
      const formValue = this.vehicleForm.value;
      this.savedMessage.set(`Vehicle ${formValue.vehicleName} saved!`);
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
    this.vehicleForm.reset(initialData);
  }
}
