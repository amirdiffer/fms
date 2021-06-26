import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  /* '''''Asset Routing''''' */
  {
    path: 'assets',
    loadChildren: () =>
      import('./assets/assets.module').then((m) => m.AssetsModule)
  },

  /* '''''Sub Asset Routing''''' */
  {
    path: 'sub-asset',
    loadChildren: () =>
      import('./sub-asset/sub-asset.module').then((m) => m.SubAssetModule)
  },

  /* '''''Accessory Routing''''' */
  {
    path: 'accessory',
    loadChildren: () =>
      import('./accessory/accessory.module').then((m) => m.AccessoryModule)
  },

  /* '''''Operator Routing''''' */
  {
    path: 'operator',
    loadChildren: () =>
      import('./operator/operator.module').then((m) => m.OperatorModule)
  },

  /* '''''Organization Routing''''' */
  {
    path: 'department',
    loadChildren: () =>
      import('./organization/organization.module').then(
        (m) => m.OrganizationModule
      )
  },

  /* '''''Movement Routing''''' */
  {
    path: 'movement',
    loadChildren: () =>
      import('./movement/movement.module').then((m) => m.MovementModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule {}
