import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigurationComponent } from './configuration.component';
import { OwnershipComponent } from '@feature/configuration/ownership/ownership.component';
import { FleetStatusComponent } from '@feature/configuration/fleet-status/fleet-status.component';
import { AssetConfigurationComponent } from './asset-configuration/asset-configuration.component';
import { BusinessCategoryComponent } from '@feature/configuration/business-category/business-category.component';
import { AssetPolicyComponent } from '@feature/configuration/asset-policy/asset-policy.component';
import { PeriodicServiceComponent } from './periodic-service/periodic-service.component';
import { AddCategoryComponent } from '@feature/configuration/business-category/add-category/add-category.component';

const routes: Routes = [
  {
    path: 'user-management',
    loadChildren: () =>
      import('../configuration/user-management/user-management.module').then(
        (m) => m.UserManagementModule
      )
  },
  { path: 'periodic-service', component: PeriodicServiceComponent },
  { path: 'asset-policy', component: AssetPolicyComponent },
  { path: 'business-category', component: BusinessCategoryComponent },
  {
    path: 'business-category/add-category',
    component: AddCategoryComponent,
    data: { name: 'Category Name' }
  },
  { path: 'asset-configuration', component: AssetConfigurationComponent },
  { path: 'fleet-status', component: FleetStatusComponent },
  { path: 'ownership', component: OwnershipComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
