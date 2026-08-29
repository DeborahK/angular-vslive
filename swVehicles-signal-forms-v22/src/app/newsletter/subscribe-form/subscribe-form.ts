import { Component, computed, inject, signal } from '@angular/core';
import { initialData, Subscription, subscriptionSchema } from '../subscription';
import { FieldTree, form, FormField, FormRoot, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'swv-subscribe-form',
  imports: [FormField, FormRoot],
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

  // Declare a form (FieldTree) from the model and validation/logic rules schema
  subscribeForm = form(this.subscribeModel, subscriptionSchema, {
    submission: {
      action: async (subscriptionFieldTree) => this.saveSubscription(subscriptionFieldTree),
    },
  });

  private async saveSubscription(subscriptionFieldTree: FieldTree<Subscription>) {
    // Handle the form submission
    console.log('Submitting data:', JSON.stringify(subscriptionFieldTree().value()));
    this.thanksMessage.set(`Thanks for subscribing ${this.fullName()}!`);
    await new Promise<void>((resolve) => setTimeout(resolve, 3000));

    // Reset form or navigate to another page
    await this.router.navigate(['/home']);
  }

  onCancel() {
    // Reset form (or navigate to another page)
    this.subscribeForm().reset(initialData);
  }
}
