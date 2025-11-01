import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/pages/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'vehicles',
    loadComponent: () =>
      import(
        './features/vehicles/pages/vehicles-page.component'
        ).then((m) => m.VehiclesPageComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];
