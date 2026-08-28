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




# REPLACEMENT INSTRUCTIONS

## Replace the subscribe.ts file with this:

