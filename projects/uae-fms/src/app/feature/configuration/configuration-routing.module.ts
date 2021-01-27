import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationComponent } from './configuration.component';
import { AssetPolicyComponent } from '@feature/configuration/asset-policy/asset-policy.component';

const routes: Routes = [
  { path: '', component: ConfigurationComponent },
  { path: 'asset-policy', component: AssetPolicyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
