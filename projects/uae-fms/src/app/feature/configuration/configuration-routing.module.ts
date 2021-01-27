import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetConfigurationComponent } from './asset-configuration/asset-configuration.component';

import { ConfigurationComponent } from './configuration.component';
import { BusinessCategoryComponent } from '@feature/configuration/business-category/business-category.component';
import { AssetPolicyComponent } from '@feature/configuration/asset-policy/asset-policy.component';
import { PeriodicServiceComponent } from './periodic-service/periodic-service.component';

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
  { path: 'asset-configuration', component: AssetConfigurationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
