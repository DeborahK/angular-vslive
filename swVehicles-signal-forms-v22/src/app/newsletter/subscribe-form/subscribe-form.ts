import { Component, computed, inject, signal } from '@angular/core';
import { initialData, Subscription, subscriptionSchema } from '../subscription';
import { form, FormField, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'swv-subscribe-form',
  imports: [FormField],
  templateUrl: './subscribe-form.html',
  styleUrl: './subscribe-form.css',
})
export class SubscribeForm {
  private readonly router = inject(Router);
  thanksMessage = signal('');

  // Create a form model signal with form fields
  // This represents the form's data structure
  subscribeModel = signal<Subscription>(initialData);

  // Access any of the signal properties as needed
  fullName = computed(() => this.subscribeModel().firstName + ' ' + this.subscribeModel().lastName);

  // Declare a form from the model and logic rules schema
  subscribeForm = form(this.subscribeModel, subscriptionSchema);

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    submit(this.subscribeForm, async () => {
      // Handle form submission here
      // Reset form or navigate to another page
      this.thanksMessage.set(`Thanks for subscribing ${this.fullName()}!`);

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 3000);
      });

      await this.router.navigate(['/home']);
    });
  }

  onCancel() {
    // Reset form (or navigate to another page)
    this.subscribeForm().reset(initialData);
  }
}
