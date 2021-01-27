import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigurationComponent } from './configuration.component';
import { BusinessCategoryComponent } from '@feature/configuration/business-category/business-category.component';
import { AssetPolicyComponent } from '@feature/configuration/asset-policy/asset-policy.component';
import { PeriodicServiceComponent } from './periodic-service/periodic-service.component';

const routes: Routes = [
  { path: '', component: ConfigurationComponent },
  {
    path: 'user-management',
    loadChildren: () =>
    import('../configuration/user-management/user-management.module').then(
      (m) => m.UserManagementModule
      )
    },
    { path: 'periodic-service', component: PeriodicServiceComponent },
    { path: 'asset-policy', component: AssetPolicyComponent },
    { path: 'business-category', component: BusinessCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
