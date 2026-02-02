import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sneakers',
    pathMatch: 'full'
  },
  {
    path: 'sneakers',
    loadComponent: () =>
      import('./features/sneakers/pages/sneaker-list/sneaker-list.component')
        .then(m => m.SneakerListComponent)
  },
  {
    path: '**',
    redirectTo: 'sneakers'
  }
];