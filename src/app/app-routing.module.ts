import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from '@layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from '@layout/content-layout/content-layout.component';

import { AuthGuard } from '@guards/auth/auth.guard';
import { NoAuthGuard } from '@guards/no-auth/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [
      AuthGuard
    ],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [
      NoAuthGuard
    ],
    loadChildren: () =>
      import('@modules/auth/auth.module').then(m => m.AuthModule)
  },
  // Fallback when no prior routes is matched
  { 
    path: '**', 
    redirectTo: '/auth/login', 
    pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class AppRoutingModule { }
