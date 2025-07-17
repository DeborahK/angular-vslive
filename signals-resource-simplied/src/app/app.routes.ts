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
  {
    path: 'cart',
    loadComponent: () => 
      import('./cart/cart-shell/cart-shell').then(c => c.CartShell)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFound }
];
