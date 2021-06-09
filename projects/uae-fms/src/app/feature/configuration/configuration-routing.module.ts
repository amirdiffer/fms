import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnershipComponent } from './ownership/ownership.component';
import { OwnershipFormComponent } from './ownership/ownership-form/ownership-form.component';
import { PeriodicServiceComponent } from './periodic-service/periodic-service.component';
import { AddPeriodicServiceComponent } from './periodic-service/add-periodic-service/add-periodic-service.component';
import { PermissionGuard } from '@core/Permission/permission.guard';

const routes: Routes = [

  {
    path:'asset-configuration',
    loadChildren: () =>
      import('./asset-configuration/asset-configuration.module').then((m) => m.AssetConfigurationModule)
  },

  {
    path: 'user-management',
    loadChildren: () =>
      import('./user-management/user-management.module').then((m) => m.UserManagementModule)
  },

  {
    path: 'asset-policy',
    loadChildren: () =>
      import('./asset-policy/asset-policy.module').then((m) => m.AssetPolicyModule)
  },

  {
    path: 'usage-category',
    loadChildren: () =>
      import('./business-category/business-category.module').then((m) => m.BusinessCategoryModule)
  },

  {
    path : 'fleet-status',
    loadChildren: () =>
      import('./fleet-status/fleet-status.module').then((m) => m.FleetStatusModule)
  },

  {
    path : 'ownership',
    loadChildren: () =>
      import('./ownership/ownership.module').then((m) => m.OwnershipModule)
  },

  {
    path : 'periodic-service',
    loadChildren: () =>
      import('./periodic-service/periodic-service.module').then((m) => m.PeriodicServiceModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
