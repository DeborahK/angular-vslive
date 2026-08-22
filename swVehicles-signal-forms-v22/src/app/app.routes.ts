import { Routes } from '@angular/router';
import { PageNotFound } from './page-not-found';
import { Home } from './home/home';

export const routes: Routes = [
  { path: 'home', component: Home },
  {
    path: 'vehicles',
    loadComponent: () =>
      import('./vehicles/vehicle-shell/vehicle-shell').then(c => c.VehicleShell)
  },
  // Only use one type of form: Signal-based, template-driven, or reactive forms
  {
    path: 'vehicle-form',
    loadComponent: () =>
      import('./vehicles/vehicle-signal-form/vehicle-form').then(c => c.VehicleForm)
  },
  // {
  //   path: 'vehicle-form',
  //   loadComponent: () =>
  //     import('./vehicles/vehicle-template-driven-form/vehicle-template-driven-form').then(c => c.VehicleTemplateDrivenForm)
  // },
  // {
  //   path: 'vehicle-form',
  //   loadComponent: () =>
  //     import('./vehicles/vehicle-reactive-form/vehicle-reactive-form').then(c => c.VehicleReactiveForm)
  // },
  {
    path: 'subscribe',
    loadComponent: () =>
      import('./newsletter/subscribe-form/subscribe-form').then(c => c.SubscribeForm)
  },
  {
    path: 'user-profile',
    loadComponent: () =>
      import('./user/user-profile-form/user-profile-form').then(c => c.UserProfileForm)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFound }
];
