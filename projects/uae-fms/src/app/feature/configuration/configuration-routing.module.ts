import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationComponent } from './configuration.component';
import { OwnershipComponent } from '@feature/configuration/ownership/ownership.component';

const routes: Routes = [
  { path: '', component: ConfigurationComponent },
  { path: 'ownership', component: OwnershipComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
