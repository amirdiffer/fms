import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FleetComponent } from './fleet.component';
import { AccessoryComponent } from '@feature/fleet/accessory/accessory.component';

const routes: Routes = [
  { path: '', component: FleetComponent },
  { path: 'accessory', component: AccessoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule {}
