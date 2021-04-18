import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OwnershipComponent } from './ownership/ownership.component';
import { FleetStatusComponent } from './fleet-status/fleet-status.component';
import { AssetPolicyComponent } from './asset-policy/asset-policy.component';
import { OwnershipFormComponent } from './ownership/ownership-form/ownership-form.component';
import { PeriodicServiceComponent } from './periodic-service/periodic-service.component';
import { AddFleetStatusComponent } from '@feature/configuration/fleet-status/add-fleet-status/add-fleet-status.component';
import { BusinessCategoryComponent } from './business-category/business-category.component';
import { AddCategoryComponent } from './business-category/add-category/add-category.component';
import { AssetConfigurationComponent } from './asset-configuration/asset-configuration.component';
import { AddAssetPolicyComponent } from './asset-policy/add-asset-policy/add-asset-policy.component';
import { AddPeriodicServiceComponent } from './periodic-service/add-periodic-service/add-periodic-service.component';
import { AddTypeComponent } from '@feature/configuration/asset-configuration/add-type/add-type.component';
import { AddMakeComponent } from './asset-configuration/add-make/add-make.component';
import { AddModelComponent } from '@feature/configuration/asset-configuration/add-model/add-model.component';
import { AddTrimComponent } from '@feature/configuration/asset-configuration/add-trim/add-trim.component';

const routes: Routes = [
  { path: 'asset-configuration', component: AssetConfigurationComponent },
  { path: 'add-asset-configuration', component: AddTypeComponent },
  {
    path: 'asset-configuration/add-make/:assetType',
    component: AddMakeComponent
  },
  {
    path: 'asset-configuration/add-model/:assetType/:make',
    component: AddModelComponent
  },
  {
    path: 'asset-configuration/add-trim/:assetType/:make/:model',
    component: AddTrimComponent
  },
  { path: 'usage-category', component: BusinessCategoryComponent },
  { path: 'periodic-service', component: PeriodicServiceComponent },
  { path: 'asset-policy/add-asset-policy', component: AddAssetPolicyComponent },
  {
    path: 'asset-policy/edit-asset-policy',
    component: AddAssetPolicyComponent
  },
  { path: 'asset-policy/add', component: AddAssetPolicyComponent },
  { path: 'ownership/add-ownership', component: OwnershipFormComponent },
  { path: 'ownership/edit-ownership/:id', component: OwnershipFormComponent },
  { path: 'asset-policy', component: AssetPolicyComponent },
  // { path: 'fleet-status', component: FleetStatusComponent },
  { path: 'ownership', component: OwnershipComponent },
  {
    path: 'periodic-service/add-periodic-service',
    component: AddPeriodicServiceComponent,
    data: { name: 'Add Periodic Service' }
  },
  {
    path: 'periodic-service/edit-periodic-service',
    component: AddPeriodicServiceComponent
  },
  {
    path: 'usage-category/add-usage-category',
    component: AddCategoryComponent,
    data: { name: 'Category Name' }
  },
  {
    path: 'usage-category/edit-usage-category/:id',
    component: AddCategoryComponent
  },
  {
    path: 'user-management',
    loadChildren: () =>
      import('../configuration/user-management/user-management.module').then(
        (m) => m.UserManagementModule
      )
  },
  { path: 'periodic-service', component: PeriodicServiceComponent },
  { path: 'asset-policy', component: AssetPolicyComponent },
  { path: 'usage-category', component: BusinessCategoryComponent },
  { path: 'asset-configuration', component: AssetConfigurationComponent },
  /* { path: 'fleet-status', component: FleetStatusComponent },
  {
    path: 'fleet-status/add-fleet-status',
    component: AddFleetStatusComponent,
    data: { name: 'Add Fleet Status' }
  }, */
  {
    path: 'fleet-status/edit-fleet-status/:id',
    component: AddFleetStatusComponent,
    data: { name: 'Edit Fleet Status' }
  },
  { path: 'ownership', component: OwnershipComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-management'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
