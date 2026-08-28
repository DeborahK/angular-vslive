# Demo Instructions

# Set up (DAY BEFORE)
* Update files (see Replacement Instructions below):
  subscribe-form.html, subscribe-form.ts, subscription.ts

# Set up (RIGHT BEFORE TALK)
* Launch VS Code with project
* Open needed files: subscribe-form.html, subscribe-form.ts, subscription.ts

# Signal Forms First Look

## *** RUN ***

Displays the form, but it doesn't do anything

## STEP 1: Define the model

-> **subscription.ts**

View the model

## STEP 2: Declare the Model Signal

-> **subscribe-form.ts**
```
  // Declare the model
  subscribeModel = signal<Subscription>(initialData);

  // Access any of the signal properties
  fullName = computed(() => this.subscribeModel().firstName + ' ' + this.subscribeModel().lastName);
```
## STEP 3: Declare the form
-> **subscribe-form.ts**
```
  subscribeForm = form(this.subscribeModel);
```
## STEP 4: Map fields to controls
-> **subscribe-form.ts**
```
  imports: [FormField],
```
-> **subscribe-form.html**
```
Subscribe to our Newsletter {{fullName()}}

[formField]="subscribeForm.firstName"
[formField]="subscribeForm.lastName"
[formField]="subscribeForm.email"
[formField]="subscribeForm.phone"
[formField]="subscribeForm.sendViaEmail"
[formField]="subscribeForm.sendViaText"
[formField]="subscribeForm.yearsAsFan"
```
## *** RUN ***

Displays the form, full name works

# Basic Validation

## STEP 1: Define the Rules In form()
-> **subscribe-form.ts**
```
  subscribeForm = form(this.subscribeModel, rootPath => {
    required(rootPath.email, 
             { message: 'Email address is required'});
  });
```

## STEP 1: Define the Rules with a Schema
-> **subscription.ts**
```
export const subscriptionSchema = schema<Subscription>((rootPath) => {
  required(rootPath.email, 
    { message: 'Email address is required'});
  email(rootPath.email, 
    { message: 'Enter a valid email address' });
  minLength(rootPath.email, 6, 
    { message: 'Email must be at least 6 characters long' });
  min(rootPath.yearsAsFan, 0, 
    { message: 'Years cannot be negative' });
  max(rootPath.yearsAsFan, 100, 
    { message: 'Enter a valid number' });
});
```
-> **subscribe-form.ts**
```
  subscribeForm = form(this.subscribeModel, subscriptionSchema);
```

## STEP 2: Check Form/Field State
-> **subscribe-form.ts**
```
  @if (subscribeForm.email().required()) {
    <span class="text-danger">*</span>
  }
```
```
  @if (subscribeForm.phone().required()) {
    <span class="text-danger">*</span>
  }
```

## Disable the submit button
-> **subscribe-form.ts**
```
  [disabled]="this.subscribeForm().invalid()"
```

## STEP 3: Display Validation Messages
-> **subscribe-form.ts**
```
  @if (subscribeForm.email().invalid() && subscribeForm.email().touched()) {
    <div class="alert alert-danger">
      @for (error of subscribeForm.email().errors(); track error.kind) {
        <div>{{ error.message }}</div>
      }
    </div>
  }
```
```
  @if (subscribeForm.phone().invalid() && subscribeForm.phone().touched()) {
    <div class="alert alert-danger">
      @for (error of subscribeForm.phone().errors(); track error.kind) {
        <div>{{ error.message }}</div>
      }
    </div>
  }
```
```
  @if (subscribeForm.yearsAsFan().invalid() && subscribeForm.yearsAsFan().touched()) {
    <div class="alert alert-danger">
      @for (error of subscribeForm.yearsAsFan().errors(); track error.kind) {
        <div>{{ error.message }}</div>
      }
    </div>
  }
```
## *** RUN ***

Try out each of the validation rules:
- Email
  - required
  - Valid email address
  - Min of 6 characters
- Years as fan
  - Not negative
  - Not greater than 100

  BUT: We want cross-field validation for the checkboxes.

# Conditional Validation
-> **subscription.ts**
```
  required(rootPath.email, {
    message: 'Your email address is required to receive our newsletter',
    when: ({ valueOf }) => valueOf(rootPath.sendViaEmail) === true
  });
```



# Custom Validation

# Cross-field Validation








# Submission
-> **subscribe-form.html**
```
    <form autocomplete="off" (submit)="onSubmit($event)">
```
```
          <button
            type="submit"
            title="Ensure the form is valid and required fields are entered before subscribing"
            class="btn btn-primary"
          >
```
-> **subscribe-form.ts**
```
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

```
-> **subscribe-form.ts**
```
    this.subscribeForm().reset(initialData);
```


# REPLACEMENT INSTRUCTIONS

## Replace the subscription.ts file with this:
import { applyWhen, email, max, min, minLength, required, schema, validate } from "@angular/forms/signals";

export interface Subscription {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  sendViaText: boolean;
  sendViaEmail: boolean;
  yearsAsFan: number | null;
}

export const initialData: Subscription = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  sendViaText: true,
  sendViaEmail: true,
  yearsAsFan: null
};

## Replace the subscribe-form.ts file with this:



## Replace the subscribe-form.html file with this:
<div class="card">
  <div class="card-header">Subscribe to our Newsletter</div>
  <div class="card-body">
    <form autocomplete="off">
      <div class="row">
        <label class="row-label" for="firstNameId"> First Name </label>
        <div class="row-value">
          <input
            type="text"
            class="form-control"
            id="firstNameId"
            placeholder="First Name"
          />
        </div>
      </div>

      <div class="row">
        <label class="row-label" for="lastNameId"> Last Name </label>
        <div class="row-value">
          <input
            type="text"
            class="form-control"
            id="lastNameId"
            placeholder="Last Name"
          />
        </div>
      </div>

      <div class="row">
        <label class="row-label" for="emailId">
          Email
        </label>
        <div class="row-value">
          <input
            type="email"
            class="form-control"
            id="emailId"
            placeholder="Email"
          />
        </div>
      </div>

      <div class="row">
        <label class="row-label" for="phoneId">
          Phone
        </label>
        <div class="row-value">
          <input
            type="tel"
            class="form-control"
            id="phoneId"
            placeholder="Cell Phone Number"
          />
        </div>
      </div>

      <div class="row">
        <label class="row-label"> Send via </label>
        <div class="row-value">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="sendViaEmailId"
            />
            <label class="form-check-label" for="sendViaEmailId"> Email </label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="sendViaTextId"
            />
            <label class="form-check-label" for="sendViaTextId"> Text </label>
          </div>
        </div>
      </div>

      <div class="row">
        <label class="row-label" for="yearsAsFanId"> Years as a Fan </label>
        <div class="row-value">
          <input
            type="number"
            class="form-control"
            id="yearsAsFanId"
            placeholder="How many years have you been a Star Wars fan?"
          />
        </div>
      </div>

      <div class="row">
        <div class="row-value">
          <button
            type="submit"
            title="Ensure the form is valid and required fields are entered before subscribing"
            class="btn btn-primary"
          >
            Subscribe
          </button>
          <button type="button" class="btn btn-secondary" (click)="onCancel()">Cancel</button>
        </div>
      </div>

      <div class="row">
        <div class="row-value">
          @if (thanksMessage()) {
            <div class="alert alert-success" role="status" aria-live="polite">
              {{ thanksMessage() }}
            </div>
          }
        </div>
      </div>
    </form>
  </div>
</div>

