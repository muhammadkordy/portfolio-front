import { Routes } from '@angular/router';
import { adminGuard, guestGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./public/public-layout.component').then((m) => m.PublicLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./public/home.component').then((m) => m.HomeComponent),
      },
    ],
  },
  {
    path: 'admin/login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./admin/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./admin/admin-layout.component').then((m) => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'stats',
        loadComponent: () =>
          import('./admin/stats-manager.component').then((m) => m.StatsManagerComponent),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./admin/services-manager.component').then((m) => m.ServicesManagerComponent),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./admin/projects-manager.component').then((m) => m.ProjectsManagerComponent),
      },
      {
        path: 'clients',
        loadComponent: () =>
          import('./admin/clients-manager.component').then((m) => m.ClientsManagerComponent),
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./admin/messages-inbox.component').then((m) => m.MessagesInboxComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
