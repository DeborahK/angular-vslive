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

-> **subscription-form.ts**
```
  // Declare the model
  subscribeModel = signal<Subscription>(initialData);

  // Access any of the signal properties
  fullName = computed(() => this.subscribeModel().firstName + ' ' + this.subscribeModel().lastName);
```
## STEP 3: Declare the form
-> **subscription-form.ts**
```
  subscribeForm = form(this.subscribeModel);
```
## STEP 4: Map fields to controls
-> **subscription-form.html**
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

## In form()
-> **subscription-form.ts**
```
  subscribeForm = form(this.subscribeModel, rootPath => {
    required(rootPath.email, 
             { message: 'Email address is required'});
  });
```

## Define a Schema
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
-> **subscription-form.ts**
```
  subscribeForm = form(this.subscribeModel, subscriptionSchema);
  ```

## *** RUN ***

Can't see the validation errors.
Need to read the state and display messages in the template.

# Accessing Validation State









# Submission




# REPLACEMENT INSTRUCTIONS

## Replace the subscribe.ts file with this:

