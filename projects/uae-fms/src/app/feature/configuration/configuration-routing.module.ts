import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigurationComponent } from './configuration.component';
import { OwnershipComponent } from '@feature/configuration/ownership/ownership.component';
import { OwnershipFormComponent } from '@feature/configuration/ownership-form/ownership-form.component';
import { FleetStatusComponent } from '@feature/configuration/fleet-status/fleet-status.component';
import { AssetConfigurationComponent } from './asset-configuration/asset-configuration.component';
import { BusinessCategoryComponent } from '@feature/configuration/business-category/business-category.component';
import { AssetPolicyComponent } from '@feature/configuration/asset-policy/asset-policy.component';
import { PeriodicServiceComponent } from './periodic-service/periodic-service.component';
import { AddCategoryComponent } from '@feature/configuration/business-category/add-category/add-category.component';
import { AddPeriodicServiceComponent } from '@feature/configuration/periodic-service/add-periodic-service/add-periodic-service.component';
import { AddAssetPolicyComponent } from './asset-policy/add-asset-policy/add-asset-policy.component';

const routes: Routes = [
  {
    path: 'user-management',
    loadChildren: () =>
      import('../configuration/user-management/user-management.module').then(
        (m) => m.UserManagementModule
      )
  },
  { path: 'periodic-service', component: PeriodicServiceComponent },
  {
    path: 'periodic-service/add-periodic-service',
    component: AddPeriodicServiceComponent,
    data: { name: 'Add Periodic Service' }
  },
  { path: 'asset-policy', component: AssetPolicyComponent },
  { path: 'asset-policy/add', component: AddAssetPolicyComponent },
  { path: 'business-category', component: BusinessCategoryComponent },
  {
    path: 'business-category/add-category',
    component: AddCategoryComponent,
    data: { name: 'Category Name' }
  },
  { path: 'asset-configuration', component: AssetConfigurationComponent },
  { path: 'fleet-status', component: FleetStatusComponent },
  { path: 'ownership', component: OwnershipComponent },
  { path: 'ownership/add', component: OwnershipFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
