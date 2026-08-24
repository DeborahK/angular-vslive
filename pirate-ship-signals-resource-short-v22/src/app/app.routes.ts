import { Routes } from '@angular/router';
import { PageNotFound } from './page-not-found';
import { Home } from './home/home';

export const routes: Routes = [
  { path: 'home', component: Home },
  {
    path: 'ships',
    loadComponent: () => 
      import('./ships/ship-shell/ship-shell').then(c => c.ShipShell)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFound }
];
