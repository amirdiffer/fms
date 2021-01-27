import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigurationComponent } from './configuration.component';
import { FleetStatusComponent } from '@feature/configuration/fleet-status/fleet-status.component';

const routes: Routes = [
  { path: '', redirectTo: 'fleet-status', component: ConfigurationComponent },
  { path: 'fleet-status', component: FleetStatusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
