import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./feature/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      )
  },
  {
    path: 'fleet',
    loadChildren: () =>
      import('./feature/fleet/fleet.module').then((m) => m.FleetModule)
  },
  {
    path: 'workshop',
    loadChildren: () =>
      import('./feature/workshop/workshop.module').then((m) => m.WorkshopModule)
  },
  {
    path: 'configuration',
    loadChildren: () =>
      import('./feature/configuration/configuration.module').then(
        (m) => m.ConfigurationModule
      )
  },
  {
    path: 'part-store',
    loadChildren: () =>
      import('./feature/part-store/part-store.module').then(
        (m) => m.PartStoreModule
      )
  },
  {
    path: 'traffic-fine',
    loadChildren: () =>
      import('./feature/traffic-fine/traffic-fine.module').then(
        (m) => m.TrafficFineModule
      )
  },
  {
    path: 'toll',
    loadChildren: () =>
      import('./feature/toll/toll.module').then((m) => m.TollModule)
  },
  {
    path: 'integration',
    loadChildren: () =>
      import('./feature/integration/integration.module').then(
        (m) => m.IntegrationModule
      )
  },
  {
    path: 'fuel-management',
    loadChildren: () =>
      import('./feature/fuel-management/fuel-management.module').then(
        (m) => m.FuelManagementModule
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
