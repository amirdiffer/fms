import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetConfigurationComponent } from './asset-configuration/asset-configuration.component';

import { ConfigurationComponent } from './configuration.component';

const routes: Routes = [
  { path: '', component: ConfigurationComponent },
  { path: 'asset-configuration', component: AssetConfigurationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
