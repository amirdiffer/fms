import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from '@core/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../app/core/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'dashboard',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      )
  },
  {
    path: 'fleet',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/fleet/fleet.module').then((m) => m.FleetModule)
  },
  {
    path: 'workshop',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/workshop/workshop.module').then((m) => m.WorkshopModule)
  },
  {
    path: 'configuration',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/configuration/configuration.module').then(
        (m) => m.ConfigurationModule
      )
  },
  {
    path: 'part-store',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/part-store/part-store.module').then(
        (m) => m.PartStoreModule
      )
  },
  {
    path: 'traffic-fine',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/traffic-fine/traffic-fine.module').then(
        (m) => m.TrafficFineModule
      )
  },
  {
    path: 'toll',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/toll/toll.module').then((m) => m.TollModule)
  },
  {
    path: 'integration',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/integration/integration.module').then(
        (m) => m.IntegrationModule
      )
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
