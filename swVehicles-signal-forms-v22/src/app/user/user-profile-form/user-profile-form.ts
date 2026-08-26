import { Component, signal } from '@angular/core';
import { initialData, initialLink, UserProfile, userProfileSchema } from '../user-profile';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'swv-user-profile-form',
  imports: [FormField],
  templateUrl: './user-profile-form.html',
  styleUrl: './user-profile-form.css',
})
export class UserProfileForm {

  // Create a form model signal with form fields
  // This represents the form's data structure
  userProfileModel = signal<UserProfile>(initialData);

  // Declare a form from the model and logic rules schema
  userProfileForm = form(this.userProfileModel, userProfileSchema);

  // Add an empty social media profile link
  addSocialLink() {
    this.userProfileModel.update(profile => ({
      ...profile,
      socialLinks: [...profile.socialLinks, { ...initialLink }]
    }));
  }

  // Delete a social media profile link
  removeSocialLink(index: number) {
    this.userProfileModel.update(profile => ({
      ...profile,
      socialLinks: profile.socialLinks.filter((_, i) => i !== index)
    }));
  }

  onSubmit() {
    if (this.userProfileForm().valid()) {
      console.log('Form submitted:', this.userProfileModel());
      // Handle form submission here
      // Reset form or navigate to another page
    }
  }

  onCancel() {
    // Reset form (or navigate to another page)
    this.userProfileForm().reset(initialData);
  }
}
