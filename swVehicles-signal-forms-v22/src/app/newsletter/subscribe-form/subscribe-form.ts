import { Component, signal } from '@angular/core';
import { initialData, Subscription, subscriptionSchema } from '../subscription';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'swv-subscribe-form',
  imports: [FormField],
  templateUrl: './subscribe-form.html',
  styleUrl: './subscribe-form.css',
})
export class SubscribeForm {
  // Create a form model signal with form fields
  // This represents the form's data structure
  subscribeModel = signal<Subscription>(initialData);

  // Declare a form from the model and logic rules schema
  subscribeForm = form(this.subscribeModel, subscriptionSchema);

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.subscribeForm().valid()) {
      console.log('Form submitted:', this.subscribeModel());
      // Handle form submission here
      // Reset form or navigate to another page
    }
  }

  onCancel() {
    // Reset form (or navigate to another page)
    this.subscribeForm().reset(initialData);
  }
}
