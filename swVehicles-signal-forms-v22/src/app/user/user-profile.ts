import { applyEach, max, min, pattern, required, schema, SchemaPathTree, validate } from "@angular/forms/signals";

export interface UserProfile {
  firstName: string;
  lastName: string;
  socialLinks: ProfileLink[];
}

export interface ProfileLink {
  linkUrl: string;
  platform: string;
  memberSinceYear: string;
}

export const initialData: UserProfile = {
  firstName: '',
  lastName: '',
  socialLinks: []
}

export const initialLink: ProfileLink = {
  linkUrl: '',
  platform: '',
  memberSinceYear: ''
}

export const userProfileSchema = schema<UserProfile>(rootPath => {
  required(rootPath.firstName, { message: 'First name is required' });
  applyEach(rootPath.socialLinks, linksSchema);
});

// Define the set of validation rules for the array items
// Social link is required if added
// Social link must be a valid URL
// Platform is required if a social link was entered
// Member since year must be between 1990 and the current year
// Member since year must be 4 digits
const linksSchema = schema<ProfileLink>((path) => {
  required(path.linkUrl, { message: 'If added, the social link is required' });
  url(path.linkUrl, { message: 'The social link must be a valid URL' });
  required(path.platform, {
    message: 'Platform name is required when link is entered',
    when: (ctx) => Boolean(ctx.valueOf(path.linkUrl))
  });
  min(path.memberSinceYear, minYear, { message: 'Year must be 1990 or later' });
  max(path.memberSinceYear, currentYear, { message: 'Year must be this year or earlier' });
  pattern(path.memberSinceYear, /^\d{4}$/, { message: 'Year must be four digits (YYYY)' });
});

const currentYear = new Date().getFullYear();
const minYear = 1990;

// Reusable custom url validator
// NOTE: Validates that the url is well-formed, not that it exists
function url(field: SchemaPathTree<string>, options?: { message?: string }) {
  validate(field, (ctx) => {
    try {
      // Use the URL constructor to determine if the value is a valid url
      new URL(ctx.value());
      return null;
    } catch {
      return {
        kind: 'url',
        message: options?.message || 'Please enter a valid URL',
      };
    }
  });
}
