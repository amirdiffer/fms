import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
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
