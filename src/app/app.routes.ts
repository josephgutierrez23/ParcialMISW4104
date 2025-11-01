import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/login/pages/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'dashboard/vehicles',
    loadComponent: () =>
      import(
        './features/vehicles/layout/vehicles-page-layout.component'
        ).then((m) => m.VehiclesPageLayoutComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  }
];
